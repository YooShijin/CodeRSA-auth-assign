import "./globals.css";

export const metadata = {
  title: "Auth App",
  description: "A simple authentication app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main className="flex min-h-screen bg-gray-100 justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-md w-96">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
