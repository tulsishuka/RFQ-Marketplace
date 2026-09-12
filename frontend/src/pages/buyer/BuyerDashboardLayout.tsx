import { Outlet } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";

const BuyerDashboardLayout = () => {
  return (
    <DashboardLayout role="buyer">
      <Outlet />
    </DashboardLayout>
  );
};

export default BuyerDashboardLayout;