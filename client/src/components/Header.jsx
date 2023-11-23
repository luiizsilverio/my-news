
import { Link, NavLink } from "react-router-dom"
import logo from "../assets/react.svg";

export default function Header() {
  return ( 
    <header>
      <Link to="/" className="logo">
        <img src={logo} alt="ReactJs" />ReactJs
      </Link>

      <nav>
        <NavLink to="/">Início</NavLink>
        <NavLink to="/books">Livros</NavLink>
        <NavLink to="/about">Sobre</NavLink>
      </nav>
    </header>
  )
}