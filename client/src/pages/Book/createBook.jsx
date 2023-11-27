
import { useState } from "react";
import NoImage from "../../assets/no-image-selected.jpg";

export default function CreateBook() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [stars, setStars] = useState(0);
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const createBook = async(e) => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    e.preventDefault();

    try {
      const response = await fetch(`${baseUrl}/api/books`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          slug,
          stars,
        })
      });

      if (response.ok) {
        setTitle("");
        setSlug("");
        setSubmitted(true);

      } else {
        console.log("Erro ao enviar os dados do livro.")
      }

    } catch(error) {
      console.log(error);
    }
  }

  return ( 
    <div>
      <h1>Cadastrar Livro</h1>

      {submitted && (
        <p>Dados enviados com sucesso!</p>
      )}
      
      <form className="bookdetails" onSubmit={createBook}>
        <div className="col-1">
          <label htmlFor="thumbnail">Carregar Imagem</label>
          <img src={NoImage} alt="preview da imagem" id="thumbnail" />
          <input type="file" accept="image/gif, image/jpeg, image/png" />
        </div>

        <div className="col-2">
          <div>
            <label htmlFor="title">Título</label>
            <input type="text" 
              value={title} id="title" 
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="slug">Identificador</label>
            <input type="text" 
              value={slug} id="slug" 
              onChange={(e) => setSlug(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="stars">Classificação (1-5)</label>
            <input type="number" 
              value={stars} id="stars" 
              min={1} max={5}
              onChange={(e) => setStars(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="description">Descrição</label>
            <textarea
              rows="4" cols="50"
              value={description} id="description" 
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="categories">Categorias (separadas por vírgula)</label>
            <input type="string" 
              value={categories} id="categories" 
              onChange={(e) => setCategories(e.target.value)}
            />
          </div>

          <input type="submit" value="ENVIAR" />
        </div>
      </form>
    </div>
  )
}