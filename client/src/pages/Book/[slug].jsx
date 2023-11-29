import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function SingleBook() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [livro, setLivro] = useState({});
  const params = useParams();
  
  useEffect(() => {
    const fetchData = async() => {
      let url = `${baseUrl}/api/books/${params.slug}`;

      try {
        const response = await fetch(url, { next: { revalidate: 60 * 5 } });

        if (!response.ok) {
          throw new Error("Erro ao acessar livros.");
        }

        const data = await response.json();
        setLivro(data);

      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [baseUrl, params]);

  
  return ( 
    <div>
      {/* <pre>{JSON.stringify(livros, null, 2)}</pre> */}

      <Link to={"/books"}>⬅Books</Link>

      <div className="bookdetails">
        <div className="col-1">
          <img src={`${baseUrl}/uploads/${livro?.thumbnail}`} alt={livro?.title} />
          <p>
            <Link to={`/books/edit/${livro?.slug}`}>Alterar</Link>            
          </p>
        </div>
        
        <div className="col-2">
          <h1>{ livro?.title }</h1>
          <p>{ livro?.description }</p>
          <p>Avaliação: {"⭐".repeat(livro?.stars)}</p>
          <p>Categoria</p>
          <ul>
            {livro?.category?.map((item, index) => (
              <li key={index}>{ item }</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}