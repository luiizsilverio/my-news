import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Book() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [livros, setLivros] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selCategory, setSelCategory] = useState("");

  useEffect(() => {
    const fetchData = async() => {
      let url = `${baseUrl}/api/books`;

      if (selCategory) {
        url = url + `?category=${selCategory}`;
      }

      try {
        const response = await fetch(url, { next: { revalidate: 60 * 5 } });

        if (!response.ok) {
          throw new Error("Erro ao acessar livros.");
        }

        const data = await response.json();
        setLivros(data);
        setIsLoading(false);

      } catch (error) {
        console.log(error);
        setError("Erro ao buscar livros. Tente novamente daqui a pouco.");
        setIsLoading(false);
      }
    }

    fetchData();
  }, [baseUrl, selCategory]);


  return ( 
    <div>
      <h2>Livros</h2>
      <p>Lista de livros no catálogo.</p>
      {/* <pre>{JSON.stringify(livros, null, 2)}</pre> */}

      <div className="filters">
        <label htmlFor="categorias">Categorias</label>
        <select id="categorias" onChange={(e) => setSelCategory(e.target.value)}>
          <option value="">Todos</option>
          <option value="romance">Romance</option>
          <option value="science">Ciência</option>
          <option value="crime">Crime</option>
          <option value="food">Receitas</option>
          <option value="adventure">Aventura</option>
          <option value="thriller">Suspense</option>
          <option value="fiction">Ficção</option>
          <option value="other">Outros</option>
        </select>

      </div>

      {error && (
        <p>{ error }</p>
      )}

      {isLoading && !error && (
        <p>Aguarde...</p>
      )}
      
      {!isLoading && !error && (
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
      )}

    </div>
  )
}