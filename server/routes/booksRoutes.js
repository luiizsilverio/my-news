import express from "express";
import Book from "../models/Books.js";

const router = express.Router();

router.get("/api/books", async (req, res) => {
  try {
    const { category } = req.query;
    const filter = {};
    if (category) {
      filter.category = category;
    }

    const data = await Book.find(filter).sort('title');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Ocorreu um erro ao buscar os livros." })
  }
})

router.get("/api/books/:slug", async (req, res) => {
  try {
    const { slug } = req.params;

    const data = await Book.findOne({ slug });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Ocorreu um erro ao buscar o livro." })
  }
})


export default router;
