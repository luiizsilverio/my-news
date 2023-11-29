import express from "express";
import Book from "../models/Books.js";
import upload from "../config/multer.js";

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

router.post("/api/books", upload.single("thumbnail"), async (req, res) => {
  try {
    const { slug, title, stars, description, category } = req.body;

    const newBook = new Book({
      slug,
      title,
      stars,
      description,
      category,
      thumbnail: req.file?.filename || ""
    })

    await Book.create(newBook);
    res.status(201).send("Livro cadastrado com sucesso");
    
  } catch (error) {
    res.status(500).json({ error: "Ocorreu um erro ao buscar o livro." })
  }
})

router.put("/api/books", upload.single("thumbnail"), async (req, res) => {
  try {
    const { id, slug, title, stars, description, category } = req.body;

    const newBook = {
      slug,
      title,
      stars,
      description,
      category,
    }
    console.log("id:", id)

    if (req.file) {
      newBook.thumbnail = req.file.filename;
    }

    await Book.findByIdAndUpdate(id, newBook);
    res.status(200).send("Livro alterado com sucesso");
    
  } catch (error) {
    res.status(500).json({ error: "Ocorreu um erro ao buscar o livro." });
  }
})

router.delete("/api/books/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Book.findByIdAndDelete(id);
    res.status(200).send("Livro excluído com sucesso");

  } catch (error) {
    res.status(500).json({ error: "Ocorreu um erro ao excluir o livro." });
  }
})

export default router;
