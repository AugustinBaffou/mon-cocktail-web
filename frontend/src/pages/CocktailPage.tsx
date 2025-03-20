import React, { useState } from "react";
import { 
  Clock, 
  Star, 
  ArrowLeft, 
  Plus, 
  Minus
} from "lucide-react";
import { Link } from "react-router-dom";

const CocktailDetail: React.FC = () => {
  const [servings, setServings] = useState(1);
  const [unit, setUnit] = useState<'oz' | 'cl' | 'part'>('oz');

  const cocktail = {
    name: "Gin Tonic",
    emoji: "🍸",
    description: "Un classique rafraîchissant qui allie la simplicité à l'élégance.",
    serviceDescription: "Servir dans un verre highball avec glaçons.",
    preparationDetails: "Mélanger le gin et le tonic sur glace, ajouter une rondelle de citron.",
    ingredients: [
      { 
        name: "Gin", 
        quantity: 2, 
        baseQuantity: 2,
        unit: "oz",
        parent: "London Dry Gin"
      },
      { 
        name: "Schweppes Tonic", 
        quantity: 3, 
        baseQuantity: 3,
        unit: "oz"
      },
      { 
        name: "Citron", 
        quantity: 0.5, 
        baseQuantity: 0.5,
        unit: "oz",
        role: "Garniture"
      }
    ],
    preparationSteps: [
      "Remplir un verre highball de glaçons",
      "Verser le gin sur les glaçons",
      "Ajouter le tonic water",
      "Presser un quartier de citron et décorer"
    ],
    nutritionalInfo: {
      calories: 180,
      alcohol: "14%",
      sugar: "5g"
    },
    types: [
      { name: "À base de gin", emoji: "🍸" },
      { name: "Long drink", emoji: "🥤" }
    ],
    preparationTime: 5,
    difficulty: 1
  };

  // Fonction pour convertir les unités
  const convertUnit = (value: number, fromUnit: string, toUnit: string) => {
    // Conversion simplifiée (à adapter selon vos besoins précis)
    const conversionRates = {
      'oz_to_cl': 29.5735,
      'cl_to_oz': 1 / 29.5735,
      'oz_to_part': 1,
      'part_to_oz': 1
    };

    const key = `${fromUnit}_to_${toUnit}` as keyof typeof conversionRates;
    return value * (conversionRates[key] || 1);
  };

  // Mise à jour des quantités en fonction des servings et de l'unité
  const updatedIngredients = cocktail.ingredients.map(ing => ({
    ...ing,
    quantity: +(convertUnit(
      convertUnit(ing.baseQuantity, ing.unit, 'oz') * servings, 
      'oz', 
      unit
    ).toFixed(2))
  }));

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-6">
        {/* Header de navigation */}
        <div className="flex justify-between items-center mb-8">
          <Link 
            to="/recipes" 
            className="flex items-center gap-2 text-primary hover:text-secondary transition"
          >
            <ArrowLeft size={24} />
            <span className="hidden sm:inline">Retour</span>
          </Link>
          <div className="flex items-center gap-2">
            {cocktail.types.map((type, index) => (
              <span 
                key={index}
                className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full flex items-center gap-1"
              >
                {type.emoji} {type.name}
              </span>
            ))}
          </div>
        </div>

        {/* Section principale */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Côté gauche - Visuel */}
          <div className="relative">
            <div className="aspect-square bg-white rounded-2xl shadow-lg flex items-center justify-center">
              <div className="w-64 h-64 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center">
                <span className="text-8xl">{cocktail.emoji}</span>
              </div>
            </div>
            
            {/* Contrôles de servings et unités */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                <div className="flex justify-center items-center gap-4 mb-2">
                  <button 
                    onClick={() => setServings(Math.max(1, servings - 1))}
                    className="bg-primary/10 text-primary p-1 rounded-full"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="font-medium text-primary">{servings} pers.</span>
                  <button 
                    onClick={() => setServings(servings + 1)}
                    className="bg-primary/10 text-primary p-1 rounded-full"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <p className="text-xs text-gray-500">Personnes</p>
              </div>
              
              <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                <div className="flex justify-center items-center gap-4 mb-2">
                  {(['oz', 'cl', 'part'] as const).map((u) => (
                    <button
                      key={u}
                      onClick={() => setUnit(u)}
                      className={`px-2 py-1 rounded-full transition ${
                        unit === u 
                          ? 'bg-primary text-white' 
                          : 'bg-primary/10 text-primary'
                      }`}
                    >
                      {u}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500">Unités</p>
              </div>
            </div>
            
            {/* Statistiques rapides */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                <Clock size={24} className="mx-auto text-primary mb-2" />
                <p className="font-medium text-primary">{cocktail.preparationTime} min</p>
                <p className="text-xs text-gray-500">Préparation</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                <Star size={24} className="mx-auto text-primary mb-2" />
                <div className="flex justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className={`${i < cocktail.difficulty ? 'text-orange' : 'text-gray-300'}`}
                      fill={i < cocktail.difficulty ? '#F1A411' : 'none'}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-500">Difficulté</p>
              </div>
            </div>
          </div>

          {/* Côté droit - Détails */}
          <div>
            <h1 className="text-4xl font-bold text-primary mb-4">{cocktail.name}</h1>
            <p className="text-gray-600 mb-6">{cocktail.description}</p>

            {/* Ingrédients */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-primary mb-4">Ingrédients</h2>
              {updatedIngredients.map((ingredient, index) => (
                <div 
                  key={index} 
                  className="flex justify-between items-center bg-white p-4 rounded-xl mb-4 shadow-sm"
                >
                  <div>
                    <p className="font-medium">{ingredient.name}</p>
                    {ingredient.parent && (
                      <p className="text-sm text-gray-500">
                        Idéalement {ingredient.parent}
                      </p>
                    )}
                  </div>
                  <span className="text-primary font-semibold">
                    {ingredient.quantity} {unit}
                  </span>
                </div>
              ))}
            </div>

            {/* Préparation */}
            <div>
              <h2 className="text-2xl font-semibold text-primary mb-6">Préparation</h2>
              {cocktail.preparationSteps.map((step, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-4 bg-white p-4 rounded-xl mb-4 shadow-sm"
                >
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center">
                    {index + 1}
                  </div>
                  <p>{step}</p>
                </div>
              ))}
            </div>

            {/* Informations nutritionnelles */}
            <div className="mt-6 bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold text-primary mb-4">Informations nutritionnelles</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{cocktail.nutritionalInfo.calories}</p>
                  <p className="text-sm text-gray-500">Calories</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{cocktail.nutritionalInfo.alcohol}</p>
                  <p className="text-sm text-gray-500">Alcool</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{cocktail.nutritionalInfo.sugar}</p>
                  <p className="text-sm text-gray-500">Sucre</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CocktailDetail;