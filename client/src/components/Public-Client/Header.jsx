import React from "react";
import Logo from "../../assets/photos/logos/SkrillaGangWordmarkLogo.svg";
import { Link } from "react-router-dom";
import { sessionEvent } from "../../lib/session";
// import { useDebouncedCallback } from "use-debounce";
//useDebouncedCallback({}, 2000);
function Header() {
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
  return (
    <header class="header">
      <div class="header__title">
        <img src={Logo} alt="" />
      </div>
      <nav class="nav">
        <ul class="nav__list">
          <li>
            <Link
              to={"/"}
              className="nav__link"
              onClick={() => sessionPageNavEvent("/")}
            >
              <p>HOME</p>
            </Link>
          </li>
          <li>
            <Link
              to={"/about"}
              className="nav__link"
              onClick={() => sessionPageNavEvent("/about")}
            >
              <p>ABOUT</p>
            </Link>
          </li>
          <li>
            <Link
              to={"/shop"}
              className="nav__link"
              onClick={() => sessionPageNavEvent("/shop")}
            >
              <p>SHOP</p>
            </Link>
          </li>
          <li>
            <Link
              to={"/collabs"}
              className="nav__link"
              onClick={() => sessionPageNavEvent("/collabs")}
            >
              <p>COLLABS</p>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
export default Header;
