import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div>
      <Link to={"/"}>Главная</Link>
      <b> | </b>
      <Link to={"/about"}>Обо мне</Link>
      <b> | </b>
      <Link to={"/contacts"}>Контакты</Link>
      <b> | </b>
      <Link to={"/contract"}>Контракт</Link>
    </div>
  );
}

export default NavBar;
