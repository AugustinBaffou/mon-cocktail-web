import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { Home, Search, Sparkles, LogIn, LogOut, Menu, X, User, Martini } from "lucide-react";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const isAuthenticated = !!Cookies.get("authToken");

  const handleLogout = () => {
    Cookies.remove("authToken");
    setIsMenuOpen(false);
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Navbar desktop */}
      <nav className="bg-primary text-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          {/* Logo et titre */}
          <Link 
            to="/" 
            className="font-bold text-xl flex items-center gap-2"
            onClick={closeMenu}
          >
            <Martini size={24} />
            <span className="hidden sm:inline">Mon Cocktail</span>
          </Link>
          
          {/* Liens de navigation - version desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`flex items-center gap-1 hover:text-secondary transition ${isActive('/') ? 'text-secondary font-medium' : ''}`}
            >
              <Home size={18} />
              <span>Accueil</span>
            </Link>
            <Link 
              to="/recipes" 
              className={`flex items-center gap-1 hover:text-secondary transition ${isActive('/recipes') ? 'text-secondary font-medium' : ''}`}
            >
              <Search size={18} />
              <span>Recettes</span>
            </Link>
            <Link 
              to="/surprise" 
              className={`flex items-center gap-1 hover:text-secondary transition ${isActive('/surprise') ? 'text-secondary font-medium' : ''}`}
            >
              <Sparkles size={18} />
              <span>Surprise</span>
            </Link>
          </div>
          
          {/* Boutons d'authentification - version desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link 
                  to="/profile" 
                  className={`flex items-center gap-1 hover:text-secondary transition ${isActive('/profile') ? 'text-secondary font-medium' : ''}`}
                >
                  <User size={18} />
                  <span>Profil</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-secondary text-white py-1 px-3 rounded-full flex items-center gap-1 hover:bg-opacity-80 transition"
                >
                  <LogOut size={18} />
                  <span>Déconnexion</span>
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="bg-secondary text-white py-1 px-3 rounded-full flex items-center gap-1 hover:bg-opacity-80 transition"
              >
                <LogIn size={18} />
                <span>Connexion</span>
              </Link>
            )}
          </div>
          
          {/* Bouton menu burger - version mobile */}
          <button 
            className="md:hidden text-white"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Header avec effet de couleur */}
        <div className="w-full bg-gradient-to-r from-primary to-secondary h-2"></div>
      </nav>
      
      {/* Menu mobile */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-primary pt-16 md:hidden">
          <div className="flex flex-col p-4 space-y-6">
            <Link 
              to="/" 
              className={`flex items-center gap-2 text-lg ${isActive('/') ? 'text-secondary font-medium' : 'text-white'}`}
              onClick={closeMenu}
            >
              <Home size={20} />
              <span>Accueil</span>
            </Link>
            <Link 
              to="/recipes" 
              className={`flex items-center gap-2 text-lg ${isActive('/recipes') ? 'text-secondary font-medium' : 'text-white'}`}
              onClick={closeMenu}
            >
              <Search size={20} />
              <span>Recettes</span>
            </Link>
            <Link 
              to="/surprise" 
              className={`flex items-center gap-2 text-lg ${isActive('/surprise') ? 'text-secondary font-medium' : 'text-white'}`}
              onClick={closeMenu}
            >
              <Sparkles size={20} />
              <span>Surprise</span>
            </Link>
            
            <div className="border-t border-white border-opacity-20 pt-6">
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/profile" 
                    className={`flex items-center gap-2 text-lg mb-6 ${isActive('/profile') ? 'text-secondary font-medium' : 'text-white'}`}
                    onClick={closeMenu}
                  >
                    <User size={20} />
                    <span>Mon profil</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full bg-secondary text-white py-2 px-4 rounded-full flex items-center justify-center gap-2 hover:bg-opacity-80 transition"
                  >
                    <LogOut size={20} />
                    <span>Se déconnecter</span>
                  </button>
                </>
              ) : (
                <Link 
                  to="/login" 
                  className="w-full bg-secondary text-white py-2 px-4 rounded-full flex items-center justify-center gap-2 hover:bg-opacity-80 transition"
                  onClick={closeMenu}
                >
                  <LogIn size={20} />
                  <span>Se connecter</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;