import { NavLink } from "react-router-dom";
import routes from "../routes";
import "../css/Navbar.css";

const linkClass = ({ isActive }) => (isActive ? "nav-link active" : "nav-link");

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/" end className={linkClass}>
        Home
      </NavLink>
      {routes.map(({ path, title }) => (
        <NavLink key={path} to={path} className={linkClass}>
          {title}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navbar;
