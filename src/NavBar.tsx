import { Link } from "react-router-dom";

function NavBar() {
  return (
    <>
      <div className="navbar">
        <div>
          <Link to={"/mc1f/"} className="navbar_text">
            ГЛАВНАЯ
          </Link>
        </div>
        <div>
          <Link to={"/mc1f/about"} className="navbar_text">
            ОБО МНЕ
          </Link>
        </div>
        <div>
          <Link to={"/mc1f/contacts"} className="navbar_text">
            КОНТАКТЫ
          </Link>
        </div>
        <div>
          <Link to={"/mc1f/contract"} className="navbar_text">
            КОНТРАКТ
          </Link>
        </div>
      </div>
    </>
  );
}

export default NavBar;
