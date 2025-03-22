import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <span className="navbar-brand">Image Carousel</span>
      <div>
        <Link to="/" className="text-light mx-3">Home</Link>
        <Link to="/settings" className="text-light">Settings</Link>
      </div>
    </nav>
  );
};

export default Navbar;
