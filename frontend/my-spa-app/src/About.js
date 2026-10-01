import React from "react";
import plants from "./images/plants.jpg";

function About() {
  return (
    <div className="card">
      <h2>🌼 About Us</h2>

      <img
        src={plants}
        alt="Plants"
        width="350"
      />

      <p>
        Boho Bloom Studio is inspired by wildflowers,
        earthy colours and peaceful living.
      </p>

      <p>
        We create handmade journals,
        floral decorations,
        cozy home accessories
        and beautiful gifts.
      </p>

      <h3>✨ Every bloom has a beautiful story.</h3>
    </div>
  );
}

export default About;