import type { ReactNode } from "react";
import Sidebar from "./Sidebar";

type Role = "buyer" | "supplier";

interface DashboardLayoutProps {
  role: Role;
  children: ReactNode;
}

const DashboardLayout = ({
  role,
  children,
}: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-slate-50 flex">

      {/* Sidebar changes according to role */}
      <Sidebar role={role} />

      {/* Current dashboard page */}
      <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>

    </div>
  );
};

export default DashboardLayout;