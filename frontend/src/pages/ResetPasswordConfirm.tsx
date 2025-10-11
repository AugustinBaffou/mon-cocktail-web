import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { RefreshCw, Key, Mail } from "lucide-react";
import DotsSeparator from "../components/DotsSeparator";

const PasswordResetConfirm: React.FC = () => {
  const API_URL = import.meta.env.VITE_API_URL;;
  
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    if (!email) {
      setError("Email non trouvé. Veuillez recommencer le processus.");
      return;
    }

    setIsSubmitting(true);

    try {
      await axios.post(`${API_URL}/auth/password-reset-confirm`, {
        email,
        resetCode,
        newPassword
      });

      navigate("/login", { 
        state: { 
          message: "Votre mot de passe a été réinitialisé avec succès" 
        } 
      });
    } catch (error) {
      console.error("Erreur lors de la réinitialisation:", error);
      setError("Impossible de réinitialiser le mot de passe. Vérifiez votre code.");
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
          <h1 className="text-5xl font-bold text-primary">Nouveau mot de passe</h1>
          <p className="text-xl italic text-secondary mt-2">Finalisation</p>
          <div className="text-primary opacity-75 mt-4 px-4">
            <p>Un code a été envoyé à :</p>
            <p className="font-semibold mt-2 flex items-center justify-center gap-2">
              <Mail size={18} />
              {email || "votre adresse email"}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 bg-white p-6 rounded-xl shadow-md">
          <div className="mb-5">
            <label 
              htmlFor="resetCode" 
              className="block mb-2 text-sm font-medium text-primary"
            >
              Code de réinitialisation
            </label>
            <input
              type="text"
              id="resetCode"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full p-2.5 w-full focus:ring-2 focus:ring-secondary focus:border-secondary text-center tracking-widest font-medium"
              required
              value={resetCode}
              onChange={(e) => setResetCode(e.target.value)}
              placeholder="Entrez le code à 6 chiffres"
              maxLength={6}
            />
          </div>

          <div className="mb-5">
            <label 
              htmlFor="newPassword" 
              className="block mb-2 text-sm font-medium text-primary"
            >
              Nouveau mot de passe
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <Key size={18} className="text-gray-400" />
              </div>
              <input
                type="password"
                id="newPassword"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full ps-10 p-2.5 w-full focus:ring-2 focus:ring-secondary focus:border-secondary"
                placeholder="••••••••"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-5">
            <label 
              htmlFor="confirmPassword" 
              className="block mb-2 text-sm font-medium text-primary"
            >
              Confirmez le mot de passe
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <Key size={18} className="text-gray-400" />
              </div>
              <input
                type="password"
                id="confirmPassword"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full ps-10 p-2.5 w-full focus:ring-2 focus:ring-secondary focus:border-secondary"
                placeholder="••••••••"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
                Réinitialisation en cours...
              </>
            ) : (
              "Réinitialiser mon mot de passe"
            )}
          </button>
        </form>

        <DotsSeparator />
      </div>
    </div>
  );
};

export default PasswordResetConfirm;