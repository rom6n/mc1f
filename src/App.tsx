import "./App.css";
import { Route, Routes } from "react-router-dom";
import About from "./pages/About";
import MainPage from "./pages/MainPage";
import Contacts from "./pages/Contacts";
import Contract from "./pages/Contract";
import NavBar from "./NavBar";

function App() {
  return (
    <>
      <div>
        <NavBar />
      </div>
      <Routes>
        <Route path="/mc1f/" Component={MainPage} />
        <Route path="/mc1f/about" Component={About} />
        <Route path="/mc1f/contacts" Component={Contacts} />
        <Route path="/mc1f/contract" Component={Contract} />
      </Routes>
    </>
  );
}

export default App;
