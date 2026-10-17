import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Navbar from "./lib/Navbar";
import BootstrapClient from "./lib/BootstrapClient";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <BootstrapClient />
        {children}
      </body>
    </html>
  );
}