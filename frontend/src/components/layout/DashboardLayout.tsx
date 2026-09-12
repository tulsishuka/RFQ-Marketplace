import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
type Role = "buyer" | "supplier";

interface DashboardLayoutProps {
  role: Role;
  children: ReactNode;
}

const DashboardLayout = ({ role, children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar role={role} />

      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
