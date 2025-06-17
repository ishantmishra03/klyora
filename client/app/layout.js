import "./globals.css";
import { ReduxProvider } from "../redux/ReduxProvider";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar/Navbar";

export const metadata = {
  title: "Klyora",
  description: "eCommerce for everything",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <Navbar />
          <Toaster />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
