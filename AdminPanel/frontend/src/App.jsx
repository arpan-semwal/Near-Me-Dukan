
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage";
import ShopkeeperPage from "../Pages/ShopkeeperPage/ShopkeeperPage";
import ViewCategoryPage from "../Pages/ViewCategoryPage/ViewCategoryPage";
import AddMainCategory from "../Pages/AddMainCategory/AddMainCategory";
import AddSalesAssosiate from "../Pages/AddSalesAssosiate/AddSalesAssosiate";


function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/shopkeeper" element={<ShopkeeperPage/>}/>
          <Route path="/viewcategory" element={<ViewCategoryPage/>}/>
          <Route path="/addmaincategory" element={<AddMainCategory/>}/>
          <Route path="/add_sales_assosiate" element={<AddSalesAssosiate/>}/>
          <Route/>
      </Routes>
    </BrowserRouter>
    
  );
}
export default App;
