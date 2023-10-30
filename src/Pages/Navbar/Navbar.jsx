import { NavLink } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
  return (
    <div className="navbar">
      <nav>
        <NavLink to="/" activeclassname="active" className="nav-item link">
          Dashboard
        </NavLink>
        <NavLink to="/wards" activeclassname="active" className="nav-item link">
          Wards
        </NavLink>
        <NavLink
          to="/patients"
          activeclassname="active"
          className="nav-item link"
        >
          Patients
        </NavLink>
      </nav>
    </div>
  );
};
