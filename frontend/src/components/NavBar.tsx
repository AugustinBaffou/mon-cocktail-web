import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Supprimer le token d'authentification du cookie
    Cookies.remove("authToken");
    // Rediriger l'utilisateur vers la page de connexion ou d'accueil
    navigate("/");
  };

  const isAuthenticated = !!Cookies.get("authToken");

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
      {isAuthenticated && (
        <button
          onClick={handleLogout}
          className="hover:underline text-red-500"
        >
          Se déconnecter
        </button>
      )}
    </nav>
  );
};

export default Navbar;
