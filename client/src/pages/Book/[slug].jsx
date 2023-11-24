import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function SingleBook() {
  const [livros, setLivros] = useState([]);
  const params = useParams();
  
  useEffect(() => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const fetchData = async() => {
      let url = `${baseUrl}/api/books/${params.slug}`;

      try {
        const response = await fetch(url, { next: { revalidate: 60 * 5 } });

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
  }, [params]);

  
  return ( 
    <>
      <div>Single Book</div>
      <pre>{JSON.stringify(livros, null, 2)}</pre>
    </>
  )
}