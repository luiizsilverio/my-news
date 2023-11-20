import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";
import connectDB from "./connectDB.js";

const app = express();

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("My-News API");
})

app.get("*", (req, res) => {
  return res.sendStatus(404);
})

app.listen(PORT, () => {
  console.log(`My-News API rodando na porta: ${PORT}`);
})