require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Allow your Vercel frontend (and localhost for development)
const allowedOrigins = [
  process.env.FRONTEND_URL, // e.g. https://boho-bloom.vercel.app
  "http://localhost:3000",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use(express.json());

// ---------- Data ----------
const about = {
  title: "About Us",
  paragraphs: [
    "Boho Bloom Studio is inspired by wildflowers, earthy colours and peaceful living.",
    "We create handmade journals, floral decorations, cozy home accessories and beautiful gifts.",
  ],
  tagline: "Every bloom has a beautiful story.",
};

const contactInfo = {
  email: "hello@bohobloom.com",
  instagram: "@bohobloomstudio",
  pinterest: "Boho Bloom Studio",
};

const products = [
  { id: 1, name: "Handmade Journal", price: 450, category: "Journals" },
  { id: 2, name: "Dried Floral Wreath", price: 850, category: "Decor" },
  { id: 3, name: "Cozy Candle Set", price: 600, category: "Home" },
  { id: 4, name: "Wildflower Gift Box", price: 1200, category: "Gifts" },
];

// In-memory storage for contact messages
// (use a database like MongoDB for permanent storage)
const messages = [];

// ---------- Routes ----------
app.get("/", (req, res) => {
  res.json({ message: "Boho Bloom Studio API is running 🌸" });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/about", (req, res) => {
  res.json(about);
});

app.get("/api/contact-info", (req, res) => {
  res.json(contactInfo);
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === Number(req.params.id));
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
});

app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email and message are required" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  const newMessage = {
    id: messages.length + 1,
    name,
    email,
    message,
    createdAt: new Date().toISOString(),
  };
  messages.push(newMessage);

  console.log("New message:", newMessage);
  res.status(201).json({ success: true, message: "Thank you! We'll be in touch 🌿" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ error: err.message || "Server error" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});