import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { ChevronLeft, Clock, GlassWater, ThumbsUp, Share2, Bookmark, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

// Cette page est une maquette statique, les données seraient normalement récupérées via API
const CocktailDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isSaved, setIsSaved] = useState(false);

  // Données mockées pour le Gin Tonic
  const cocktail = {
    id: 1,
    name: "Gin Tonic",
    emoji: "🍸",
    description: "Un classique rafraîchissant, parfait pour les soirées d'été. Le mélange d'arômes botaniques du gin avec l'amertume légère du tonic crée un équilibre parfait.",
    serviceDescription: "Servir dans un verre highball avec des glaçons.",
    preparationDetails: "1. Remplir un verre highball de glaçons\n2. Verser le gin\n3. Compléter avec le tonic\n4. Remuer délicatement\n5. Garnir d'une rondelle de citron",
    ingredients: [
      { id: 1, name: "Gin", quantity: 2.0, parent: { id: 2, name: "London Dry Gin" } },
      { id: 4, name: "Lemon", quantity: 0.5, parent: null },
      { id: 7, name: "Schweppes Tonic", quantity: 3.0, parent: null }
    ],
    types: [
      { id: 1, name: "À base de gin", emoji: "🍸", category: "Par base alcoolique principale" },
      { id: 5, name: "Long drink", emoji: "🥤", category: "Par présentation" },
      { id: 9, name: "Modéré", emoji: "🟡", category: "Par force alcoolique" },
      { id: 30, name: "Désaltérant", emoji: "💦", category: "Par effet recherché" }
    ],
    timeToMake: "5 minutes",
    difficulty: "Facile"
  };

  const toggleSave = () => {
    setIsSaved(!isSaved);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header avec bouton retour */}
      <div className="bg-primary text-white p-4 flex items-center sticky top-0 z-10">
        <Link to="/recipes" className="flex items-center">
          <ChevronLeft size={24} />
          <span className="ml-2">Retour aux recettes</span>
        </Link>
      </div>

      {/* Image avec overlay */}
      <div className="relative w-full h-64 md:h-80 bg-primary">
        {/* Remplacer par une image réelle quand disponible */}
        <div className="absolute inset-0 flex items-center justify-center bg-primary bg-opacity-80 text-white rounded-3xl">
          <span className="text-8xl">{cocktail.emoji}</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-primary to-transparent rounded-3xl">
          <h1 className="text-3xl font-bold text-white">{cocktail.name}</h1>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="container mx-auto px-4 py-6 flex-grow rounded-xl">
        {/* Actions rapides */}
        <div className="flex justify-between mb-6">
          <div className="flex items-center text-primary">
            <Clock size={20} />
            <span className="ml-2 text-sm">{cocktail.timeToMake}</span>
            <span className="mx-2">•</span>
            <span className="text-sm">{cocktail.difficulty}</span>
          </div>
          <div className="flex space-x-4">
            <button className="text-primary hover:text-secondary transition">
              <ThumbsUp size={20} />
            </button>
            <button className="text-primary hover:text-secondary transition">
              <Share2 size={20} />
            </button>
            <button 
              className={`${isSaved ? 'text-secondary' : 'text-primary'} hover:text-secondary transition`}
              onClick={toggleSave}
            >
              <Bookmark size={20} fill={isSaved ? "#FB7D8A" : "none"} />
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-primary mb-2">Description</h2>
          <p className="text-primary">{cocktail.description}</p>
        </div>

        {/* Caractéristiques */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-primary mb-2">Caractéristiques</h2>
          <div className="flex flex-wrap gap-2">
            {cocktail.types.map(type => (
              <span 
                key={type.id} 
                className="inline-flex items-center bg-primary bg-opacity-10 text-primary px-3 py-1 rounded-full text-sm"
              >
                <span className="mr-1">{type.emoji}</span>
                {type.name}
              </span>
            ))}
          </div>
        </div>

        {/* Ingrédients */}
        <div className="mb-6 bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-xl font-semibold text-primary mb-4">Ingrédients</h2>
          <ul className="divide-y divide-gray-100">
            {cocktail.ingredients.map(ingredient => (
              <li key={ingredient.id} className="py-3 flex justify-between items-center">
                <div>
                  <p className="font-medium text-primary">
                    {ingredient.name}
                    {ingredient.parent && (
                      <span className="font-normal text-sm text-gray-500 block">
                        Idéalement {ingredient.parent.name}
                      </span>
                    )}
                  </p>
                </div>
                <div className="flex items-center">
                  <span className="text-primary font-medium">{ingredient.quantity} oz</span>
                  <button className="ml-4 text-green hover:text-opacity-80 transition">
                    <PlusCircle size={20} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Préparation */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-primary mb-2">Préparation</h2>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <p className="text-primary italic mb-4">{cocktail.serviceDescription}</p>
            <div className="text-primary whitespace-pre-line">
              {cocktail.preparationDetails}
            </div>
          </div>
        </div>

        {/* Appel à l'action */}
        <div className="mt-8 flex justify-center">
          <button className="bg-secondary text-white py-3 px-6 rounded-full flex items-center justify-center gap-2 hover:bg-opacity-90 transition shadow-md">
            <GlassWater size={20} />
            Préparer ce cocktail
          </button>
        </div>
      </div>
    </div>
  );
};

export default CocktailDetail;