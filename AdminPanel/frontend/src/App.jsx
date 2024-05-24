import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage";
import ShopkeeperPage from "../Pages/ShopkeeperPage/ShopkeeperPage";
import ViewCategoryPage from "../Pages/ViewCategoryPage/ViewCategoryPage";
import AddMainCategory from "../Pages/AddMainCategory/AddMainCategory";
import AddSalesAssosiate from "../Pages/AddSalesAssosiate/AddSalesAssosiate";
import ViewSalesAssociate from "../Pages/ViewSalesAssociate/ViewSalesAssociate";
import UpdateSalesAssociate from "../Pages/ViewSalesAssociate/UpdateSalesAssociate/UpdateSalesAssociate";
import ProductMaster from "../Pages/ProductMaster/ProductMaster";
import SalesAssociateTeam from "../Pages/SalesAssociateTeam/SalesAssociateTeam";
import CommissionSetting from "../Pages/CommissionSetting/CommissionSetting";
import AdminLogin from "../Pages/AdminLogin/AdminLogin";
import Otp from "../Pages/Otp/Otp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<AdminLogin/>}/>
          <Route path="/otp" element={<Otp/>}/>
          <Route path="/homepage" element={<HomePage/>}/>
          <Route path="/shopkeeper" element={<ShopkeeperPage/>}/>
          <Route path="/viewcategory" element={<ViewCategoryPage/>}/>
          <Route path="/addmaincategory" element={<AddMainCategory/>}/>
          <Route path="/add_sales_assosiate" element={<AddSalesAssosiate/>}/>
          <Route path="/view_sales_associate" element={<ViewSalesAssociate/>}/>
          <Route path="/update_sales/:mobileNo" element={<UpdateSalesAssociate/>}/>
          <Route path="/product_master" element={<ProductMaster/>}/>
          <Route path="/sales_associate_team" element={<SalesAssociateTeam/>}/>
          <Route path="/commission_setting" element={<CommissionSetting/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
 