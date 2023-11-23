import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Book() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [livros, setLivros] = useState([]);

  useEffect(() => {
    const fetchData = async() => {
      try {
        const response = await fetch(`${baseUrl}/api/books`);

        if (!response.ok) {
          throw new Error("Erro ao acessar livros.");
        }

        const data = await response.json();
        setLivros(data);

      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [baseUrl]);


  return ( 
    <div>
      <h2>Livros</h2>
      {/* <pre>{JSON.stringify(livros, null, 2)}</pre> */}

      <ul className="books">
        {
          livros.map((item) => (
            <li key={item._id}>
              <Link to={`/books/${item.slug}`}>
                <img src={`${baseUrl}/uploads/${item.thumbnail}`} alt={item.title} />                
                <h3>{item.title}</h3>
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
}