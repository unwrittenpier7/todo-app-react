import { Link } from "react-router-dom";
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <h1 className="header-title">To-Do App</h1>
      <nav className="header-nav">
        <Link to="/"></Link>
      </nav>
    </header>
  );
}