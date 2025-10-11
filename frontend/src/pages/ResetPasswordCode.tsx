import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RefreshCw, Key, Mail } from "lucide-react";
import DotsSeparator from "../components/DotsSeparator";

const PasswordResetRequest: React.FC = () => {
  const API_URL = import.meta.env.VITE_API_URL;;

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await axios.post(`${API_URL}/auth/password-reset-request`, { email });
      navigate("/password-reset-confirm", { state: { email } });
    } catch (error) {
      console.error("Erreur lors de la demande de réinitialisation:", error);
      setError("Impossible de traiter votre demande. Vérifiez votre email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grow bg-background flex items-center justify-center">
      <div className="p-8 rounded-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <div className="h-16 w-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Key size={28} className="text-white" />
          </div>
          <h1 className="text-5xl font-bold text-primary">Mot de passe</h1>
          <p className="text-xl italic text-secondary mt-2">Réinitialisez votre accès</p>
          <p className="text-primary opacity-75 mt-4 px-4 text-center">
            Entrez votre adresse email pour recevoir un code de réinitialisation
          </p>
        </div>

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
                value={email}
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
            disabled={isSubmitting}
            className="w-full text-white bg-primary hover:bg-opacity-90 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-3 text-center transition shadow-md flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <RefreshCw size={16} className="animate-spin" />
                Envoi en cours...
              </>
            ) : (
              "Réinitialiser mon mot de passe"
            )}
          </button>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Vous vous souvenez de votre mot de passe ? {" "}
              <a href="/login" className="text-secondary hover:underline font-medium">
                Connectez-vous
              </a>
            </p>
          </div>
        </form>

        <DotsSeparator />
      </div>
    </div>
  );
};

export default PasswordResetRequest;