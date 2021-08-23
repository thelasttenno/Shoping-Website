import React from "react";
import KaiPic from "../../../assets/photos/Photoshoot/Kai_looking_Good.JPG";
import coverpic from "../../../assets/photos/Photoshoot/4_inarow.JPG";
import "./About.scss";

function About() {
  return (
    <section className="About">
      <div className="About__head">
      </div>
      <div className="About__header">
        <div className="Aboutimg">
          <img src={KaiPic}  alt="" />
          <img src={KaiPic}  alt="" />
        </div>
        <div className="Content">
          <div className="Content__Bio">
            <h2 className="ContentBio__Title">About</h2>
            <h3>Welcome To Skrilla Gang Clothing</h3>
            <p>
            $krilla-gang was founded on February, 20, 2021. $krilla-gang was thought up in November, 2020 by Jeremiah Fabas. He had an epiphany, and wasn't sure if it would really work out. By February,2021 he decided it was time to start moving, and thus $krilla-gang was born! Jeremiah quickly gathered together his team and was determined to launch his clothing brand. ​

Jeremiah is very self motivated, and people oriented, this is exemplified by $krilla-gang company. Along with Jeremiah, he has a vast team of exceptional, hardworking employees and volunteers, striving for their best.

$krilla-gang employees are always working on new idiosyncratic designs, seeking their best, and trying to motivate Kelowna!
            </p>
          </div>
          <div className="Content__ContactInfo">
            <h2>Contact</h2>
          </div>
        </div>
      </div>
    </section>
  );
}
export default About;
