import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 bg-soft-white flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-midnight-blue" />
        <p className="text-midnight-blue font-medium text-lg">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
}
