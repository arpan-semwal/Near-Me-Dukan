 
import  {BrowserRouter , Routes , Route} from "react-router-dom"
import HomePage from "./Pages/HomePage/HomePage"
import AddTeamMember from "./components'/AddTeamMember/AddTeamMember"
export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/"  element={<HomePage/>}/>
          <Route path="//add-team-member"  element={<AddTeamMember/>}/>
        </Routes>
      
      </BrowserRouter>
    </div>
  )
}
