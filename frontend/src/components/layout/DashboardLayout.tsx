

import type { ReactNode } from "react";
import Sidebar from "./Sidebar";

type Role = "buyer" | "supplier";

interface DashboardLayoutProps {
  role: Role;
  children: ReactNode;
}

const DashboardLayout = ({ role, children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen w-full flex flex-row bg-[#070b14]">

      <Sidebar role={role} />

      <main className="flex-1 min-w-0 w-full overflow-x-hidden">
        {children}
      </main>

    </div>
  );
};

export default DashboardLayout;