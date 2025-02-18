import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="p-8 rounded-2xl w-full max-w-md">
        <h1 className="text-5xl font-bold text-primary">Mon Cocktail</h1>
        <p className="text-xl italic text-secondary mt-2">L’assistant de votre bar</p>
        <p className="text-gray-500 mt-4">Une app pour découvrir et créer des cocktails sur-mesure.</p>

        <div className="mt-28 flex flex-col gap-4">
          <button 
            onClick={() => navigate("/recipes")} 
            className="bg-primary text-white py-2 px-4 rounded-full text-lg hover:bg-opacity-80 transition"
            >
            Les recettes
          </button>
          <button
            onClick={() => navigate("/surprise")} 
            className="bg-primary text-white py-2 px-4 rounded-full text-lg hover:bg-opacity-80 transition"
            >
            Surprenez-moi !
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
