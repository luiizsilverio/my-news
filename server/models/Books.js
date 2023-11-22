import mongoose from "mongoose";
import { Schema } from "mongoose";

const BookSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "O título é obrigatório"],
    },
    slug: String,    
    description: String,
    thumbnail: String,
    stars: Number,
    category: Array,
  },
  {
    timestamps: true, // cria os campos createdAt e updatedAt
  }
)

const Book = mongoose.model("Book", BookSchema);

export default Book;
