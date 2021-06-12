import React from "react";
import Logo from "../../assets/photos/logos/SkrillaGangWordmarkLogo.svg";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header class="header">
      <div class="header__title">
        <img src={Logo} alt="" />
      </div>
      <nav class="nav">
        <ul class="nav__list">
          <li>
            <Link to={"/"} className="nav__link">
              <p>HOME</p>
            </Link>
          </li>
          <li>
            <Link to={"/about"} className="nav__link">
              <p>ABOUT</p>
            </Link>
          </li>
          <li>
            <Link to={"/shop"} className="nav__link">
              <p>SHOP</p>
            </Link>
          </li>
          <li>
            <Link to={"/collabs"} className="nav__link">
              <p>COLLABS</p>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
export default Header;