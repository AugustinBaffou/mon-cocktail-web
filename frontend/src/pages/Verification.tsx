import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, Mail, RefreshCw } from "lucide-react";

const Verification: React.FC = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const [isResending, setIsResending] = useState(false);
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

      // Rediriger l'utilisateur vers une autre page, par exemple la page de connexion
      navigate("/login", { state: { verified: true } });
    } catch (error) {
      console.error("Erreur lors de la vérification:", error);
      setError("Code de vérification invalide. Veuillez réessayer.");
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      setError("Email non trouvé.");
      return;
    }

    setIsResending(true);
    
    try {
      // Appel API pour renvoyer le code de vérification
      await axios.post("http://localhost:8080/auth/resend-verification", { email });
      alert("Un nouveau code de vérification a été envoyé à votre adresse email.");
    } catch (error) {
      console.error("Erreur lors du renvoi du code:", error);
      setError("Impossible de renvoyer le code. Veuillez réessayer plus tard.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="grow bg-background flex items-center justify-center">
      <div className="p-8 rounded-2xl w-full max-w-md">
        {/* Titre et sous-titre */}
        <div className="text-center mb-8">
          <div className="h-16 w-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={28} className="text-white" />
          </div>
          <h1 className="text-5xl font-bold text-primary">Vérification</h1>
          <p className="text-xl italic text-secondary mt-2">Confirmez votre compte</p>
          <div className="text-primary opacity-75 mt-4 px-4">
            <p>Un email a été envoyé à :</p>
            <p className="font-semibold mt-2 flex items-center justify-center gap-2">
              <Mail size={18} />
              {email || "votre adresse email"}
            </p>
          </div>
        </div>
        
        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="mt-8 bg-white p-6 rounded-xl shadow-md">
          <div className="mb-5">
            <label
              htmlFor="verificationCode"
              className="block mb-2 text-sm font-medium text-primary"
            >
              Code de vérification
            </label>
            <input
              type="text"
              id="verificationCode"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full p-2.5 w-full focus:ring-2 focus:ring-secondary focus:border-secondary text-center tracking-widest font-medium"
              required
              value={verificationCode}
              onChange={handleChange}
              placeholder="Entrez le code à 6 chiffres"
              maxLength={6}
            />
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
            Vérifier mon compte
          </button>
          
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={handleResendCode}
              disabled={isResending}
              className="text-secondary hover:underline font-medium text-sm flex items-center justify-center mx-auto gap-1"
            >
              {isResending ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                <>
                  <RefreshCw size={16} />
                  Renvoyer le code
                </>
              )}
            </button>
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

export default Verification;