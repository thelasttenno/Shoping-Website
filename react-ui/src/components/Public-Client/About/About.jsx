import React from "react";
import KaiPic from "../../../assets/photos/Photoshoot/Kai_looking_Good.JPG";
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
              We are a small startup company based in Kelowna, British Columbia.
              We’ve been working really hard on our merchandise, and are stoked
              to share it with everyone! Our website is run by a team of unique,
              talented people, eager to meet your needs and answer any
              questions.
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
