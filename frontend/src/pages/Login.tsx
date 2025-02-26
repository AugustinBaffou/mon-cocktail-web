import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { LogIn, Mail, Key } from "lucide-react";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Envoyer les données de connexion au backend
      const response = await axios.post("http://localhost:8080/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      // Extraire le token et la durée d'expiration de la réponse
      const { token, expiresIn } = response.data;

      // Stocker le token dans un cookie
      Cookies.set("authToken", token, { expires: new Date(Date.now() + expiresIn) });

      // Rediriger l'utilisateur vers une autre page, par exemple la page d'accueil
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      setError("Email ou mot de passe incorrect. Veuillez réessayer.");
    }
  };

  return (
    <div className="grow bg-background flex items-center justify-center">
      <div className="p-8 rounded-2xl w-full max-w-md">
        {/* Titre et sous-titre */}
        <div className="text-center mb-8">
          <div className="h-16 w-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <LogIn size={28} className="text-white" />
          </div>
          <h1 className="text-5xl font-bold text-primary">Connexion</h1>
          <p className="text-xl italic text-secondary mt-2">Bienvenue parmi nous !</p>
          <p className="text-primary opacity-75 mt-4 px-4">
            Connectez-vous pour accéder à vos recettes favorites et créer de nouveaux cocktails.
          </p>
        </div>
        
        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="mt-8 bg-white p-6 rounded-xl shadow-md">
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-primary"
            >
              Votre email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <Mail size={18} className="text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full ps-10 p-2.5 w-full focus:ring-2 focus:ring-secondary focus:border-secondary"
                placeholder="name@example.com"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-primary"
            >
              Votre mot de passe
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <Key size={18} className="text-gray-400" />
              </div>
              <input
                type="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full ps-10 p-2.5 w-full focus:ring-2 focus:ring-secondary focus:border-secondary"
                placeholder="••••••••"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>
          
          {error && (
            <div className="p-4 mb-5 text-sm text-red-800 rounded-lg bg-red-50">
              <span className="font-medium">Erreur :</span> {error}
            </div>
          )}
          
          <button
            type="submit"
            className="w-full text-white bg-primary hover:bg-opacity-90 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-3 text-center transition shadow-md"
          >
            Se connecter
          </button>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Pas encore de compte ?{" "}
              <a href="/register" className="text-secondary hover:underline font-medium">
                Inscrivez-vous
              </a>
            </p>
          </div>
          
          <div className="mt-4 text-center">
            <a href="/forgot-password" className="text-sm text-gray-600 hover:underline">
              Mot de passe oublié ?
            </a>
          </div>
        </form>
        
        {/* Décoration du bas */}
        <div className="mt-8 flex justify-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green"></div>
          <div className="h-2 w-2 rounded-full bg-orange"></div>
          <div className="h-2 w-2 rounded-full bg-secondary"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;