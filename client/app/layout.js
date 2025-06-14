import "./globals.css";
import { AppProvider } from "@/context/AppContext";

export const metadata = {
  title: "Klyora",
  description: "eCommerce for everything",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
