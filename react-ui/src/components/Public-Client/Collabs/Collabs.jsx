import React from "react";
import { Link } from "react-router-dom";
import KaiPic from "../../../assets/photos/Photoshoot/Kai_looking_Good.JPG";

function Collabs() {
  return (
    <section className="Collabs">
      <div className="Collabs__head"></div>
      <div className="Collabs__header">
        <div className="Collabimg">
          <img src={KaiPic} alt="" />
          <img src={KaiPic} alt="" />
        </div>
        <div className="Content">
          <div className="ContentCTA">
            <h2 className="ContentCTA__Title">Want to Collab With us?</h2>
            <Link className="ContentCTA__Link">
              <h3>Get In Touch!</h3>
            </Link>
            <p className="ContentCTA__Info">
              {" "}
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
              quis magnam velit. Voluptate iste iusto praesentium rem
              dignissimos amet laudantium accusantium veniam quis, velit enim
              esse repellendus nisi ipsam commodi!
            </p>
          </div>
          <div className="CollabInfo">
            <h2 className="CollabInfo__Title">Contact</h2>
            <p className="CollabInfo__Info">
              {" "}
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
              quis magnam velit. Voluptate iste iusto praesentium rem
              dignissimos amet laudantium accusantium veniam quis, velit enim
              esse repellendus nisi ipsam commodi!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Collabs;
