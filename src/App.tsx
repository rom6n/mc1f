import "./App.css";
import { Route, Routes } from "react-router-dom";
import About from "./pages/About";
import MainPage from "./pages/MainPage";
import Contacts from "./pages/Contacts";
import Contract from "./pages/Contract";
import NavBar from "./NavBar";

function App() {
  return (
    <div className="App">
      <div>
        <NavBar />
      </div>
      <Routes>
        <Route path="/" Component={MainPage} />
        <Route path="/about" Component={About} />
        <Route path="/contacts" Component={Contacts} />
        <Route path="/contract" Component={Contract} />
      </Routes>
    </div>
  );
}

export default App;
