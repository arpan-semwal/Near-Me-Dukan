
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage";
import ShopkeeperPage from "../Pages/ShopkeeperPage/ShopkeeperPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/shopkeeper" element={<ShopkeeperPage/>}/>
          <Route/>
      </Routes>
    </BrowserRouter>
    
  );
}
export default App;
