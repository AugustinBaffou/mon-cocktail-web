import React from "react";
import { useNavigate } from "react-router-dom";
import { Martini, Search, Sparkles } from "lucide-react";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="grow bg-background flex flex-col items-center">
      
      {/* Contenu principal */}
      <div className="p-8 w-full max-w-md flex flex-col items-center justify-center grow">
        {/* Logo et titre */}
        <div className="text-center mb-8">
          <div className="h-24 w-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Martini size={48} className="text-white" />
          </div>
          <h1 className="text-5xl font-bold text-primary">Mon Cocktail</h1>
          <p className="text-xl italic text-secondary mt-2">L'assistant de votre bar</p>
          <p className="text-primary opacity-75 mt-4 px-4">
            Découvrez et créez des cocktails sur-mesure selon vos envies et les ingrédients disponibles.
          </p>
        </div>

        {/* Boutons d'action */}
        <div className="mt-8 flex flex-col gap-4 w-full">
          <button 
            onClick={() => navigate("/recipes")} 
            className="bg-primary text-white py-3 px-6 rounded-full text-lg flex items-center justify-center gap-2 hover:bg-opacity-90 transition shadow-md"
          >
            <Search size={20} />
            Explorer les recettes
          </button>
          
          <button
            onClick={() => navigate("/surprise")} 
            className="bg-secondary text-white py-3 px-6 rounded-full text-lg flex items-center justify-center gap-2 hover:bg-opacity-90 transition shadow-md"
          >
            <Sparkles size={20} />
            Surprenez-moi !
          </button>
          
          <button
            onClick={() => navigate("/create")} 
            className="bg-orange text-white py-3 px-6 rounded-full text-lg flex items-center justify-center gap-2 hover:bg-opacity-90 transition shadow-md"
          >
            <Martini size={20} />
            Créer mon cocktail
          </button>
        </div>
        
        {/* Décoration du bas */}
        <div className="mt-12 flex justify-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green"></div>
          <div className="h-2 w-2 rounded-full bg-orange"></div>
          <div className="h-2 w-2 rounded-full bg-secondary"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;