import React from "react";
import boho from "./images/boho.jpg";
import flowers from "./images/flowers.jpg";

function Home() {
  return (
    <div className="card">

      <img
        src={boho}
        alt="Boho"
        style={{
          width:"100%",
          maxHeight:"320px",
          objectFit:"cover",
          borderRadius:"20px"
        }}
      />

      <h2>🌸 Welcome to Boho Bloom Studio 🌸</h2>

      <img
        src={flowers}
        alt="Flowers"
      />

      <h3>Bloom Where You Are Planted 🌿</h3>

      <p>
        Welcome to Boho Bloom Studio,
        where every flower tells a story
        and every corner is inspired by nature.
      </p>

      <p>
        🌼 Handmade Décor <br/>
        🌿 Nature Inspired <br/>
        🤎 Cozy Living <br/>
        ✨ Slow Lifestyle
      </p>

    </div>
  );
}

export default Home;