
import { useState } from "react";
import NoImage from "../../assets/no-image-selected.jpg";

export default function CreateBook() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [stars, setStars] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [image, setImage] = useState(NoImage);

  const createBook = async(e) => {    
    const baseUrl = import.meta.env.VITE_BASE_URL;
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("stars", stars);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("thumbnail", thumbnail);

    try {
      const response = await fetch(`${baseUrl}/api/books`, {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        setTitle("");
        setSlug("");
        setThumbnail("");
        setSubmitted(true);

      } else {
        console.log("Erro ao enviar os dados do livro.")
      }

    } catch(error) {
      console.log(error);
    }
  }

  const handleCategoryChange = (e) => {
    setCategory(
      e.target.value
        .split(",")
        .map((category) => category.trim())
    );
  }

  const onImageChange = (e) => {
    console.log(e.target.files[0])
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
      setThumbnail(e.target.files[0]);
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
          <img src={image} alt="preview da imagem" id="thumbnail" />
          <input type="file" 
            accept="image/gif, image/jpeg, image/png" 
            onChange={onImageChange}
          />
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
              value={category} id="categories" 
              onChange={handleCategoryChange}
            />
          </div>

          <input type="submit" value="ENVIAR" />
        </div>
      </form>
    </div>
  )
}