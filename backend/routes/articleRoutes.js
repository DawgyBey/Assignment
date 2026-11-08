import express from "express";
import Article from "../models/Article.js";

const router = express.Router();

// CREATE  ->  POST /articles
router.post("/", async (req, res) => {
  try {
    let result = await Article.create(req.body);
    res.status(201).json({
      success: true,
      message: "Article created successfully",
      result: result,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// READ ALL  ->  GET /articles   (optional: /articles?category=Sports)
router.get("/", async (req, res) => {
  try {
    let filter = {};
    if (req.query.category) {
      filter.category = req.query.category;
    }
    // sort({ createdAt: -1 }) means newest first
    let result = await Article.find(filter).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "Articles read successfully",
      result: result,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// READ ONE  ->  GET /articles/:id
router.get("/:id", async (req, res) => {
  try {
    let result = await Article.findById(req.params.id);
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Article not found" });
    }
    res.status(200).json({
      success: true,
      message: "Article read successfully",
      result: result,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// UPDATE  ->  PATCH /articles/:id
router.patch("/:id", async (req, res) => {
  try {
    // { new: true } makes it return the updated article, not the old one
    let result = await Article.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Article not found" });
    }
    res.status(200).json({
      success: true,
      message: "Article updated successfully",
      result: result,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE  ->  DELETE /articles/:id
router.delete("/:id", async (req, res) => {
  try {
    let result = await Article.findByIdAndDelete(req.params.id);
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Article not found" });
    }
    res.status(200).json({
      success: true,
      message: "Article deleted successfully",
      result: result,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

export default router;
