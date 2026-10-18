import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Navbar from "./lib/Navbar";
import BootstrapClient from "./lib/BootstrapClient";
import { getSessionUserId } from "@/app/lib/auth";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userId = await getSessionUserId();
  const isLoggedIn = userId !== null;

  return (
    <html lang="th">
      <body>
        <Navbar isLoggedIn={isLoggedIn} />
        {children}
      </body>
    </html>
  );
}