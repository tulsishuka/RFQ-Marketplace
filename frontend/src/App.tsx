import { Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Third from "./pages/Third";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import BuyerDashboardLayout from "./pages/buyer/BuyerDashboardLayout";
import BuyerDashboard from "./pages/buyer/BuyerDashboard";
import CreateRFQ from "./pages/buyer/CreateRFQ";
import BuyerRFQDetails from "./pages/buyer/BuyerRFQDetails";
import SupplierDashboardLayout from "./pages/supplier/SuppierDashboardLayout";
import SupplierDashboard from "./pages/supplier/SupplierDashboard";
import BrowseRFQs from "./pages/supplier/BrowseRFQs";
import SupplierRFQDetails from "./pages/supplier/SupplierRFQDetails";
import MyQuotations from "./pages/supplier/MyQuotations";
import SubmitQuotation from "./pages/supplier/SubmitQuotation";

const MainPage = () => {
  return (
    <>
      <Navbar />

      <Home />
      <About />
      <Third />

      <Footer />
    </>
  );
};

function App() {
  return (
    <Routes>
      {/* Public pages */}
      <Route path="/" element={<MainPage />} />

      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

      {/* Buyer dashboard */}
      <Route path="/buyer" element={<BuyerDashboardLayout />}>
        <Route index element={<BuyerDashboard />} />

        <Route path="dashboard" element={<BuyerDashboard />} />

        <Route path="createrfq" element={<CreateRFQ />} />

        <Route path="buyerdetail" element={<BuyerRFQDetails />} />
      </Route>
      
     <Route path="/supplier" element={<SupplierDashboardLayout />}>
  <Route index element={<SupplierDashboard />} />

  <Route path="dashboard" element={<SupplierDashboard />} />

  <Route path="browse-rfqs" element={<BrowseRFQs />} />

  <Route path="rfq/:id" element={<SupplierRFQDetails />} />

  <Route
    path="rfq/:id/quotation"
    element={<SubmitQuotation />}
  />
</Route>
    </Routes>
  );
}

export default App;