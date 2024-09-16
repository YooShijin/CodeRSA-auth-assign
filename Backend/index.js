import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";
import z from "zod";

import User from "./db.js";

const app = express();

app.use(express.json());
app.use(cors());

const signupInput = z.object({
  email: z.string().email(),
  password: z.string(),
  name: z.string(),
});

app.post("/api/auth/signup", async (req, res) => {
  const body = req.body;

  const { success } = signupInput.safeParse(body);
  if (!success) {
    return res.status(411).json({
      msg: "Inputs are incorrect",
    });
  }
  try {
    const { name, email, password } = body;
    console.log(name, email, password);
    const existingUser = await User.findOne({ email });
    console.log(existingUser);
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating user" });
  }
});

const signinInput = z.object({
  email: z.string().email(),
  password: z.string(),
  name: z.string().optional(),
});
app.post("/api/auth/signin", async (req, res) => {
  const body = req.body;
  const { success } = signinInput.safeParse(body);
  if (!success) {
    return res.status(411).json({
      msg: "Inputs are incorrect",
    });
  }
  try {
    const { email, password } = body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error signing in" });
  }
});

const forgetPasswordInput = z.object({
  email: z.string().email(),
  newPassword: z.string().min(6),
});

app.post("/api/auth/forget-password", async (req, res) => {
  const body = req.body;
  const { success } = forgetPasswordInput.safeParse(body);
  if (!success) {
    return res.status(411).json({
      msg: "Inputs are incorrect",
    });
  }

  try {
    const { email, newPassword } = body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User with this email does not exist" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating password" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
