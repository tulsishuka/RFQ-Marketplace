import { Outlet } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";

const SupplierDashboardLayout = () => {
  return (
    <DashboardLayout role="supplier">
      <Outlet />
    </DashboardLayout>
  );
};

export default SupplierDashboardLayout;