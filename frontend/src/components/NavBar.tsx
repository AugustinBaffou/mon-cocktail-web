import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-primary text-white p-4 flex justify-center space-x-6 shadow-md">
      <Link to="/" className="hover:underline">
        Accueil
      </Link>
      <Link to="/recipes" className="hover:underline">
        Recettes
      </Link>
      <Link to="/surprise" className="hover:underline">
        Surprise
      </Link>
    </nav>
  );
};

export default Navbar;
