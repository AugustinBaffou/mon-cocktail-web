import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

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
    <div className="grow bg-white flex items-center justify-center">
      <div className="p-8 rounded-2xl w-full max-w-md">
        <h1 className="text-5xl font-bold text-primary">Connexion</h1>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Votre email
            </label>
            <input
              type="email"
              id="email"
              className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
              placeholder="name@example.com"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Votre mot de passe
            </label>
            <input
              type="password"
              id="password"
              className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="text-white bg-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;