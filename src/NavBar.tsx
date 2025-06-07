import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div>
      <Link to={"/mc1f/"}>Главная</Link>
      <b> | </b>
      <Link to={"/mc1f/about"}>Обо мне</Link>
      <b> | </b>
      <Link to={"/mc1f/contacts"}>Контакты</Link>
      <b> | </b>
      <Link to={"/mc1f/contract"}>Контракт</Link>
    </div>
  );
}

export default NavBar;
