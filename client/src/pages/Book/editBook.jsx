
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import NoImage from "../../assets/no-image-selected.jpg";

export default function EditBook() {
  const params = useParams();
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [stars, setStars] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [submitted] = useState(false);
  const [image, setImage] = useState("");

  useEffect(() => {
    const fetchData = async() => {
      try {
        const response = await fetch(`${baseUrl}/api/books/${params.slug}`);
  
        if (!response.ok) {
          throw new Error("Erro ao buscar os dados do livro.");
        }
  
        const data = await response.json();
        setId(data._id);
        setTitle(data.title);
        setSlug(data.slug);
        setDescription(data.description);
        setStars(data.stars);
        setCategory(data.category);
        setThumbnail(data.thumbnail);
  
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [baseUrl, params.slug]);

  const updateBook = async(e) => {    
    e.preventDefault();

    const formData = new FormData();

    formData.append("id", id);
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("stars", stars);
    formData.append("description", description);
    formData.append("category", category);

    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    try {
      const response = await fetch(`${baseUrl}/api/books`, {
        method: "PUT",
        body: formData,
      })

      if (response.ok) {
        navigate("/books");
        // setTitle("");
        // setSlug("");
        // setThumbnail("");
        // setSubmitted(true);

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
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
      setThumbnail(e.target.files[0]);
    }
  }

  const deleteBook = async(e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseUrl}/api/books/${id}`, {
        method: "DELETE"
      })

      if (response.ok) {
        navigate("/books");
        console.log("Livro excluído");
      }

    } catch (error) {
      console.log(error);
    }
  }

  return ( 
    <div>
      <h1>Alterar Livro</h1>

      <button onClick={deleteBook} className="delete">
        Excluir Livro
      </button>

      {submitted && (
        <p>Dados enviados com sucesso!</p>
      )}
      
      <form className="bookdetails" onSubmit={updateBook}>
        <div className="col-1">
          <label htmlFor="thumbnail">Carregar Imagem</label>

          {image ? (
            <img src={`${image}`} alt="preview image" />
          ) : (
            <img
              src={`${baseUrl}/uploads/${thumbnail}`}
              alt="preview image"
            />
          )}

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