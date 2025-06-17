import '../globals.css';

export const metadata = {
  title: "Klyora | Auth",
  description: "Sign in or create your Klyora account",
};

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen font-inter bg-soft-white text-midnight-blue">
      {children}
    </div>
  );
}
