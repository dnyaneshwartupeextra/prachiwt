import React, { useState } from "react";
import journal from "./images/journal.jpg";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus(data.message);
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus(data.error || "Something went wrong");
      }
    } catch {
      setStatus("Could not reach the server");
    }
  };

  return (
    <div className="card">
      <h2>💌 Contact Us</h2>

      <img src={journal} alt="Journal" width="350" />

      <p>📧 hello@bohobloom.com</p>
      <p>📷 Instagram: @bohobloomstudio</p>
      <p>📌 Pinterest: Boho Bloom Studio</p>
      <p>🌿 We'd love to hear from you!</p>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Your name" value={form.name} onChange={handleChange} required />
        <br /><br />
        <input name="email" type="email" placeholder="Your email" value={form.email} onChange={handleChange} required />
        <br /><br />
        <textarea name="message" placeholder="Your message" rows="4" value={form.message} onChange={handleChange} required />
        <br /><br />
        <button type="submit">Send 🌸</button>
      </form>

      {status && <p>{status}</p>}
    </div>
  );
}

export default Contact;