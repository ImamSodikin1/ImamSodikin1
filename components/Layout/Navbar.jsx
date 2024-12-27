import { User } from "lucide-react";

export default function Navbar({ username }) {
  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex items-center justify-between shadow-md">
      {/* Logo atau Nama Aplikasi */}
      <div className="text-lg font-bold">
        MyApp
      </div>

      {/* Username dan Icon User */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{username}</span>
        <User size={20} className="text-white" />
      </div>
    </nav>
  );
}
