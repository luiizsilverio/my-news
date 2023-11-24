import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";
import connectDB from "./connectDB.js";
import routes from "./routes/index.js";

const app = express();

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

connectDB();

routes(app);

app.listen(PORT, () => {
  console.log(`My-News API rodando na porta: ${PORT}`);
})