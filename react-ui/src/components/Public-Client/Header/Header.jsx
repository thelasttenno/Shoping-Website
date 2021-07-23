import React from "react";
import Logo from "../../../assets/photos/logos/KL-Logos/$krilla-GangLogo3Website.png";
import { Link, useLocation } from "react-router-dom";
import { sessionEvent } from "../../../lib/session";
// import "./Header.scss";
// import { useDebouncedCallback } from "use-debounce";
//useDebouncedCallback({}, 2000);
function Header(props) {
  const sessionPageNavEvent = (uri, referer) => {
    //This tracks user navigation throughout the site.
    sessionEvent({
      eventName: "pageEvent",
      eventType: "navigation",
      eventTriggerAriaLabel: "header-tab",
      referer: window.location.pathname,
      location: uri,
    });
    //
  };
  //
  const location = useLocation();
  return (
    <header className="header">
      <nav className="nav">
        <div className="nav--content">
          <Link
            className="link"
            to={"/"}
            onClick={() => sessionPageNavEvent("/")}
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
                onClick={() => sessionPageNavEvent("/")}
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
                onClick={() => sessionPageNavEvent("/about")}
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
                onClick={() => sessionPageNavEvent("/shop")}
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
                onClick={() => sessionPageNavEvent("/collabs")}
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
