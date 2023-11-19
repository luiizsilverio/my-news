import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";

const app = express();

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("My-News API");
})

app.listen(PORT, () => {
  console.log(`My-News API rodando na porta: ${PORT}`);
})