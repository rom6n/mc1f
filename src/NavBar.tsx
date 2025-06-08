import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="navbar">
      <div className="navbar_button">
        <Link to={"/mc1f/"} className="navbar_main">
          Главная
        </Link>
      </div>
      <div className="navbar_button">
        <Link to={"/mc1f/about"} className="navbar_about">
          Обо мне
        </Link>
      </div>
      <div className="navbar_button">
        <Link to={"/mc1f/contacts"} className="navbar_contacts">
          Контакты
        </Link>
      </div>
      <div className="navbar_button">
        <Link to={"/mc1f/contract"} className="navbar_contract">
          Контракт
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
