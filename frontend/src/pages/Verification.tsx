import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Verification: React.FC = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerificationCode(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Email non trouvé.");
      return;
    }

    try {
      // Envoyer le code de vérification au backend
      const response = await axios.post("http://localhost:8080/auth/verify", {
        email,
        verificationCode,
      });

      // Traitez la réponse du serveur
      console.log("Vérification réussie:", response.data);
      alert("Vérification réussie !");

      // Rediriger l'utilisateur vers une autre page, par exemple la page de connexion
      navigate("/login");
    } catch (error) {
      console.error("Erreur lors de la vérification:", error);
      setError("Code de vérification invalide. Veuillez réessayer.");
    }
  };

  return (
    <div className="grow bg-white flex items-center justify-center">
      <div className="p-8 rounded-2xl w-full max-w-md">
        <h1 className="text-5xl font-bold text-primary">Vérification</h1>
        <p className="italic text-secondary mt-2">
          Un email a été envoyé à <strong>{email}</strong> avec un code de vérification.
        </p>
        <p className="text-xl italic text-secondary mt-2">
          Entrez le code reçu ci-dessous :
        </p>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-5">
            <label
              htmlFor="verificationCode"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Code de vérification
            </label>
            <input
              type="text"
              id="verificationCode"
              className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
              required
              value={verificationCode}
              onChange={handleChange}
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="text-white bg-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Vérifier
          </button>
        </form>
      </div>
    </div>
  );
};

export default Verification;
