const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Product = require("../models/product");

// Multer Storage Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

// Allow images and .glb files
const fileFilter = (req, file, cb) => {
  const allowedExt = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".glb"];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedExt.includes(ext)) cb(null, true);
  else cb(new Error("Only image and .glb files are allowed"));
};

const upload = multer({ storage, fileFilter });

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (err) {
    res.status(500).send({ message: "Fetch error", error: err.message });
  }
});

// Upload new product with multiple media (images + .glb)
router.post("/", upload.array("media", 10), async (req, res) => {
  try {
    const mediaPaths = req.files.map(file => `uploads/${file.filename}`);
    const product = new Product({
      ...req.body,
      media: mediaPaths, // Save media files (both image + glb)
    });
    await product.save();
    res.status(201).send({ message: "Product saved" });
  } catch (err) {
    res.status(500).send({ message: "Save error", error: err.message });
  }
});

module.exports = router;