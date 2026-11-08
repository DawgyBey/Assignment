import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <h2 className="logo">Daily News</h2>
        <div className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/create">Write</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
