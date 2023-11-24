
import { useState } from "react";
import NoImage from "../../assets/no-image-selected.jpg";

export default function CreateBook() {
  const [title, setTitle] = useState("");

  return ( 
    <div>
      <h1>Cadastrar Livro</h1>
      
      <form>
        <div className="col-1">
          <label htmlFor="thumbnail">Carregar Imagem</label>
          <img src={NoImage} alt="preview da imagem" id="thumbnail" />
          <input type="file" accept="image/gif, image/jpeg, image/png" />
        </div>

        <div className="col-2">
          <div>
            <label htmlFor="">Título</label>
          </div>
        </div>
      </form>
    </div>
  )
}