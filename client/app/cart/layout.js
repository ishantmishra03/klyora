import '../globals.css'
export const metadata = {
  title: "Cart | Auth",
  description: "Sign in or create your Klyora account",
};

export default function AuthLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
