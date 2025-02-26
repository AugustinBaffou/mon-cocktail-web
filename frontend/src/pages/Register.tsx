import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    terms: false,
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Envoyer les données au backend
      const response = await axios.post("http://localhost:8080/auth/signup", {
        email: formData.email,
        password: formData.password,
        username: formData.name,
      });

      // Traitez la réponse du serveur
      console.log("User registered:", response.data);

      // Rediriger l'utilisateur vers la page de vérification
      navigate("/verify", { state: { email: formData.email } });
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      alert("Erreur lors de l'inscription. Veuillez réessayer.");
    }
  };

  return (
    <div className="grow bg-white flex items-center justify-center">
      <div className="p-8 rounded-2xl w-full max-w-md">
        <h1 className="text-5xl font-bold text-primary">Inscription</h1>
        <p className="text-xl italic text-secondary mt-2">Rejoignez-nous !</p>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-5">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Votre nom complet
            </label>
            <input
              type="text"
              id="name"
              className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
              placeholder="Jean Dupont"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
          <div className="flex items-start mb-5">
            <div className="flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                required
                checked={formData.terms}
                onChange={handleChange}
              />
            </div>
            <label htmlFor="terms" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              J'accepte les{" "}
              <a href="#" className="text-secondary hover:underline dark:text-blue-500">
                termes et conditions
              </a>
            </label>
          </div>
          <button
            type="submit"
            className="text-white bg-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Créer un compte
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
