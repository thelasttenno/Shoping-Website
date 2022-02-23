import React from "react";
import Logo from "../../../assets/photos/logos/KL-Logos/$krilla-GangLogo3Website.png";
import { Link, useLocation } from "react-router-dom";

function Header(props) {
  const location = useLocation();
  return (
    <header className="header">
      <nav className="nav">
        <div className="nav--content">
          <Link
            className="link"
            to={"/"}
          >
            <img src={Logo} className="nav-logo" alt="" />
          </Link>
          <ul className="nav-menu">
            <li>
              <Link
                to={"/"}
                className={`link nav-link ${
                  location.pathname.toLowerCase().includes("inventory")
                    ? "nav-button nav-link--active nav-button--right"
                    : ""
                }`}
              >
                <p>HOME</p>
              </Link>
            </li>
            <li>
              <Link
                to={"/about"}
                className={`link nav-link ${
                  location.pathname.toLowerCase().includes("inventory")
                    ? "nav-button nav-link--active nav-button--right"
                    : ""
                }`}
              >
                <p>ABOUT</p>
              </Link>
            </li>
            <li>
              <Link
                to={"/shop"}
                className={`link nav-link ${
                  location.pathname.toLowerCase().includes("inventory")
                    ? "nav-button nav-link--active nav-button--right"
                    : ""
                }`}
              >
                <p>SHOP</p>
              </Link>
            </li>
            <li>
              <Link
                to={"/collabs"}
                className={`link nav-link ${
                  location.pathname.toLowerCase().includes("inventory")
                    ? "nav-button nav-link--active nav-button--right"
                    : ""
                }`}
              >
                <p>COLLABS</p>
              </Link>
            </li>
            <li>
              <Link
                to={"/cart"}
                className={`link nav-link ${
                  location.pathname.toLowerCase().includes("inventory")
                    ? "nav-button nav-link--active nav-button--right"
                    : ""
                }`}
              >
                <p>
                  CART{" "}
                  {props.numCartItems() !== 0
                    ? `(${props.numCartItems()})`
                    : ""}
                </p>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
export default Header;
