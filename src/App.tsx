import "./App.css";
import { useMyContract } from "./hooks/useMyContract";
import { Route, Link, Routes } from "react-router-dom";
import About from "./pages/About";
import MainPage from "./pages/MainPage";
import Contacts from "./pages/Contacts";
import Contract from "./pages/Contract";

function App() {
  const contract = useMyContract();

  return (
    <div className="App">
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
