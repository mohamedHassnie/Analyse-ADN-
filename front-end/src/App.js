import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Navbar from "./Navbar";
import Dashbord from "./Dashbord";
import Sideebar from "./Sideebar";
import Ajout from "./Ajout";
import interfaceAdmin from "./interfaceAdmin";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Route path="/Home" component={Home}></Route>
        <Route path="/Login" component={Login}></Route>
        <Route path="/Dashbord" component={Dashbord}></Route>
        <Route path="/Sideebar" component={Sideebar}></Route>
        <Route path="/Ajout" component={Ajout}></Route>
        <Route path="/interfaceAdmin" component={interfaceAdmin}></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
