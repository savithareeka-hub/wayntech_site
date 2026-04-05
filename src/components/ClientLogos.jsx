import React from "react";
import "./clientLogos.css";

const logos = [
  "/logos/client1.png",
  "/logos/client2.png",
  "/logos/client3.png",
  "/logos/client4.png",
  "/logos/client5.png",
  "/logos/client6.png",
  "/logos/client7.png",
  "/logos/client8.png",
  "/logos/client9.png",
  "/logos/client10.png",
  "/logos/client11.png",
  
];

export default function ClientLogos() {
  return (
    <div className="logo-section">
      <h2 className="logo-title">Our Clients</h2>

      <div className="logo-slider">
        <div className="logo-track">
          {logos.concat(logos).map((logo, index) => (
            <img src={logo} alt="client" key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}