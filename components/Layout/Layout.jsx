import Navbar from "./Navbar"; // Import Navbar
import Sidebar from "./Sidebar"; // Import Sidebar
import { useState } from "react";

export default function Layout({ children, username }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar
        expanded={sidebarExpanded}
        onToggle={() => setSidebarExpanded(!sidebarExpanded)}
      />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 bg-gray-100">
        {/* Navbar */}
        <Navbar username={username} />

        {/* Main Content */}
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
}
