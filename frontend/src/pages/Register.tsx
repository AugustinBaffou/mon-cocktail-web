import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserPlus, Mail, Key, User } from "lucide-react";

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
    <div className="grow bg-background flex items-center justify-center">
      <div className="p-8 rounded-2xl w-full max-w-md">
        {/* Titre et sous-titre */}
        <div className="text-center mb-8">
          <div className="h-16 w-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <UserPlus size={28} className="text-white" />
          </div>
          <h1 className="text-5xl font-bold text-primary">Inscription</h1>
          <p className="text-xl italic text-secondary mt-2">Rejoignez-nous !</p>
          <p className="text-primary opacity-75 mt-4 px-4">
            Créez votre compte pour découvrir et partager vos cocktails préférés.
          </p>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="mt-8 bg-white p-6 rounded-xl shadow-md">
          <div className="mb-5">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-primary">
              Votre nom complet
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <User size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full ps-10 p-2.5 w-full focus:ring-2 focus:ring-secondary focus:border-secondary"
                placeholder="Jean Dupont"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-primary">
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
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-primary">
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

          <div className="flex items-start mb-5">
            <div className="flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-secondary"
                required
                checked={formData.terms}
                onChange={handleChange}
              />
            </div>
            <label htmlFor="terms" className="ms-2 text-sm font-medium text-gray-700">
              J'accepte les{" "}
              <a href="#" className="text-secondary hover:underline">
                termes et conditions
              </a>
            </label>
          </div>

          <button
            type="submit"
            className="w-full text-white bg-primary hover:bg-opacity-90 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-3 text-center transition shadow-md"
          >
            Créer mon compte
          </button>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Déjà inscrit ?{" "}
              <a href="/signin" className="text-secondary hover:underline font-medium">
                Connectez-vous
              </a>
            </p>
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

export default SignUp;