import React, { useState, useEffect } from "react";
import {
  Clock,
  Star,
  ArrowLeft,
  Plus,
  Minus,
  Share2,
  Bookmark,
  Heart,
  AlignJustify,
  Leaf,
} from "lucide-react";
import { Link } from "react-router-dom";

const CocktailDefault: React.FC = () => {
  const [servings, setServings] = useState(1);
  const [unit, setUnit] = useState<"oz" | "cl" | "part">("oz");
  const [isFavorite, setIsFavorite] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "ingredients" | "preparation" | "tips"
  >("ingredients");

  const cocktail = {
    name: "Gin Tonic",
    emoji: "🍸",
    description:
      "Un classique rafraîchissant qui allie la simplicité à l'élégance.",
    serviceDescription: "Servir dans un verre highball avec glaçons.",
    preparationDetails:
      "Mélanger le gin et le tonic sur glace, ajouter une rondelle de citron.",
    ingredients: [
      {
        name: "Gin",
        quantity: 2,
        baseQuantity: 2,
        unit: "oz",
        parent: "London Dry Gin",
      },
      {
        name: "Schweppes Tonic",
        quantity: 3,
        baseQuantity: 3,
        unit: "oz",
      },
      {
        name: "Citron",
        quantity: 1,
        baseQuantity: 1,
        unit: "pièce", // Changé de "oz" à "pièce"
        role: "Garniture",
        style: "rondelle", // Nouvelle propriété pour le style de présentation
      },
    ],
    preparationSteps: [
      "Remplir un verre highball de glaçons",
      "Verser le gin sur les glaçons",
      "Ajouter le tonic water",
      "Presser un quartier de citron et décorer",
    ],
    nutritionalInfo: {
      calories: 180,
      alcohol: "14%",
      sugar: "5g",
    },
    types: [
      { name: "À base de gin", emoji: "🍸" },
      { name: "Long drink", emoji: "🥤" },
    ],
    preparationTime: 5,
    difficulty: 1,
    tips: [
      "Utilisez des glaçons de qualité pour une dilution optimale",
      "Privilégiez un gin aux notes botaniques prononcées pour plus de caractère",
      "Pressez le citron juste avant de servir pour préserver sa fraîcheur",
    ],
    variants: [
      {
        name: "Gin Tonic au concombre",
        description:
          "Ajoutez quelques tranches de concombre pour une version rafraîchissante",
      },
      {
        name: "Gin Tonic à la baie de genièvre",
        description:
          "Écrasez quelques baies de genièvre pour accentuer les arômes du gin",
      },
    ],
    pairing:
      "Idéal avec des tapas, des fruits de mer ou des amuse-bouches légers",
  };

  // Fonction pour convertir les unités
  const convertUnit = (value: number, fromUnit: string, toUnit: string) => {
    // Conversion simplifiée (à adapter selon vos besoins précis)
    const conversionRates = {
      oz_to_cl: 29.5735 / 10,
      cl_to_oz: 10 / 29.5735,
      oz_to_part: 1,
      part_to_oz: 1,
      cl_to_part: 10 / 29.5735,
      part_to_cl: 29.5735 / 10,
    };

    const key = `${fromUnit}_to_${toUnit}` as keyof typeof conversionRates;
    return value * (conversionRates[key] || 1);
  };

  // Mise à jour des quantités en fonction des servings et de l'unité
  const updatedIngredients = cocktail.ingredients.map((ing) => ({
    ...ing,
    quantity: +convertUnit(
      convertUnit(ing.baseQuantity, ing.unit, "oz") * servings,
      "oz",
      unit
    ).toFixed(2),
  }));

  // Fonction pour partager la recette
  const shareRecipe = () => {
    if (navigator.share) {
      navigator.share({
        title: `Recette de ${cocktail.name}`,
        text: `Découvrez comment préparer un délicieux ${cocktail.name}`,
        url: window.location.href,
      });
    } else {
      // Fallback pour les navigateurs qui ne supportent pas l'API Share
      alert("Lien copié dans le presse-papier!");
    }
  };

  // Simulation de chargement des données utilisateur
  useEffect(() => {
    // Ici, vous pourriez charger les préférences utilisateur depuis une API
    setTimeout(() => {
      setIsFavorite(Math.random() > 0.5);
      setIsBookmarked(Math.random() > 0.5);
    }, 300);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link
            to="/recipes"
            className="flex items-center gap-2 text-primary hover:text-secondary transition"
          >
            <ArrowLeft size={20} />
            <span>Retour</span>
          </Link>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="p-2 rounded-full hover:bg-gray-100 transition"
            >
              <Heart
                size={20}
                className={
                  isFavorite ? "text-red-500 fill-secondary" : "text-gray-400"
                }
              />
            </button>
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className="p-2 rounded-full hover:bg-gray-100 transition"
            >
              <Bookmark
                size={20}
                className={
                  isBookmarked ? "text-primary fill-primary" : "text-gray-400"
                }
              />
            </button>
            <button
              onClick={shareRecipe}
              className="p-2 rounded-full hover:bg-gray-100 transition"
            >
              <Share2 size={20} className="text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* En-tête */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">
              {cocktail.name}
            </h1>
            <p className="text-gray-600">{cocktail.description}</p>
          </div>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            {cocktail.types.map((type, index) => (
              <span
                key={index}
                className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full flex items-center gap-1"
              >
                {type.emoji} {type.name}
              </span>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Côté gauche - Visuel */}
          <div className="space-y-6">
            <div className="relative bg-white rounded-2xl shadow-lg p-6 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
              <div className="aspect-square flex items-center justify-center">
                <div className="w-64 h-64 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center">
                  <span className="text-8xl">{cocktail.emoji}</span>
                </div>
              </div>

              <div className="mt-4 text-center">
                <p className="text-lg font-medium text-gray-800">
                  {cocktail.serviceDescription}
                </p>
              </div>
            </div>

            {/* Statistiques rapides */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                <Clock size={24} className="mx-auto text-primary mb-2" />
                <p className="font-medium text-primary">
                  {cocktail.preparationTime} min
                </p>
                <p className="text-xs text-gray-500">Préparation</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                <Star size={24} className="mx-auto text-primary mb-2" />
                <div className="flex justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={`${
                        i < cocktail.difficulty
                          ? "text-orange"
                          : "text-gray-300"
                      }`}
                      fill={i < cocktail.difficulty ? "#F1A411" : "none"}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-500">Difficulté</p>
              </div>
            </div>

            {/* Informations nutritionnelles */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold text-primary mb-4">
                Informations nutritionnelles
              </h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">
                    {cocktail.nutritionalInfo.calories}
                  </p>
                  <p className="text-sm text-gray-500">Calories</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">
                    {cocktail.nutritionalInfo.alcohol}
                  </p>
                  <p className="text-sm text-gray-500">Alcool</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">
                    {cocktail.nutritionalInfo.sugar}
                  </p>
                  <p className="text-sm text-gray-500">Sucre</p>
                </div>
              </div>
            </div>

            {/* Accord mets et boissons */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold text-primary mb-4">
                Accords
              </h2>
              <div className="flex items-center gap-3">
                <AlignJustify size={20} className="text-primary" />
                <p>{cocktail.pairing}</p>
              </div>
            </div>
          </div>

          {/* Côté droit - Détails */}
          <div className="space-y-6">
            {/* Onglets */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="flex border-b">
                <button
                  onClick={() => setActiveTab("ingredients")}
                  className={`flex-1 py-4 font-medium text-center transition ${
                    activeTab === "ingredients"
                      ? "text-primary border-b-2 border-primary"
                      : "text-gray-500 hover:text-primary"
                  }`}
                >
                  Ingrédients
                </button>
                <button
                  onClick={() => setActiveTab("preparation")}
                  className={`flex-1 py-4 font-medium text-center transition ${
                    activeTab === "preparation"
                      ? "text-primary border-b-2 border-primary"
                      : "text-gray-500 hover:text-primary"
                  }`}
                >
                  Préparation
                </button>
                <button
                  onClick={() => setActiveTab("tips")}
                  className={`flex-1 py-4 font-medium text-center transition ${
                    activeTab === "tips"
                      ? "text-primary border-b-2 border-primary"
                      : "text-gray-500 hover:text-primary"
                  }`}
                >
                  Astuces
                </button>
              </div>

              <div className="p-6">
                {/* Onglet ingrédients */}
                {activeTab === "ingredients" && (
                  <div>
                    {/* Contrôles de servings et unités */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-50 rounded-xl p-4 text-center">
                        <div className="flex justify-center items-center gap-4 mb-2">
                          <button
                            onClick={() =>
                              setServings(Math.max(1, servings - 1))
                            }
                            className="bg-primary/10 text-primary p-1 rounded-full hover:bg-primary/20 transition"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="font-medium text-primary">
                            {servings} pers.
                          </span>
                          <button
                            onClick={() => setServings(servings + 1)}
                            className="bg-primary/10 text-primary p-1 rounded-full hover:bg-primary/20 transition"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <p className="text-xs text-gray-500">Personnes</p>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-4 text-center">
                        <div className="flex justify-center items-center gap-2 mb-2">
                          {(["oz", "cl", "part"] as const).map((u) => (
                            <button
                              key={u}
                              onClick={() => setUnit(u)}
                              className={`px-3 py-1 rounded-full text-sm transition ${
                                unit === u
                                  ? "bg-primary text-white"
                                  : "bg-primary/10 text-primary hover:bg-primary/20"
                              }`}
                            >
                              {u}
                            </button>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500">Unités</p>
                      </div>
                    </div>

                    {/* Section ingrédients principaux */}
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-primary mb-3">
                        Ingrédients
                      </h3>
                      {updatedIngredients
                        .filter(
                          (ingredient) =>
                            !ingredient.role || ingredient.role !== "Garniture"
                        )
                        .map((ingredient, index) => (
                          <div
                            key={index}
                              className="flex justify-between items-center p-4 rounded-xl mb-4 border border-gray-100 hover:border-secondary/20 hover:bg-secondary/5 transition"
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

                    {/* Section garnitures */}
                    {updatedIngredients.some(
                      (ingredient) => ingredient.role === "Garniture"
                    ) && (
                      <div>
                        <h3 className="text-lg font-medium text-primary mb-3">
                          Garnitures
                        </h3>
                        {updatedIngredients
                          .filter(
                            (ingredient) => ingredient.role === "Garniture"
                          )
                          .map((ingredient, index) => {
                            // Calculer la quantité pour les garnitures en fonction du nombre de personnes
                            const garnishQuantity = Math.max(
                              1,
                              Math.round(ingredient.baseQuantity * servings)
                            );

                            // Déterminer le style de présentation (rondelle, zeste, quartier, etc.)
                            const presentationStyle =
                              ingredient.style || "pièce";

                            // Formater le texte de la quantité avec le style de présentation
                            const displayText =
                              garnishQuantity > 1
                                ? `${garnishQuantity} ${presentationStyle}s`
                                : `${garnishQuantity} ${presentationStyle}`;

                            return (
                              <div
                                key={index}
                                className="flex justify-between items-center p-4 rounded-xl mb-4 border border-gray-100 hover:border-secondary/20 hover:bg-secondary/5 transition"
                              >
                                <div>
                                  <p className="font-medium">
                                    {ingredient.name}
                                  </p>
                                  {ingredient.parent && (
                                    <p className="text-sm text-gray-500">
                                      Idéalement {ingredient.parent}
                                    </p>
                                  )}
                                </div>
                                <span className="text-primary font-semibold">
                                  {displayText}
                                </span>
                              </div>
                            );
                          })}
                      </div>
                    )}
                  </div>
                )}
                {/* Onglet préparation */}
                {activeTab === "preparation" && (
                  <div>
                    {cocktail.preparationSteps.map((step, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 p-4 rounded-xl mb-4 border border-gray-100 hover:border-primary/20 hover:bg-primary/5 transition"
                      >
                        <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                          {index + 1}
                        </div>
                        <div>
                          <p>{step}</p>
                          {index === cocktail.preparationSteps.length - 1 && (
                            <p className="text-sm text-gray-500 mt-2">
                              {cocktail.preparationDetails}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {/* Onglet astuces */}
                {activeTab === "tips" && (
                  <div>
                    <h3 className="text-lg font-medium text-primary mb-4">
                      Conseils du bartender
                    </h3>
                    {cocktail.tips.map((tip, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 p-4 rounded-xl mb-4 border border-gray-100 hover:border-primary/20 hover:bg-primary/5 transition"
                      >
                        <Leaf
                          size={20}
                          className="text-primary flex-shrink-0 mt-1"
                        />
                        <p>{tip}</p>
                      </div>
                    ))}

                    <h3 className="text-lg font-medium text-primary mb-4 mt-6">
                      Variantes
                    </h3>
                    {cocktail.variants.map((variant, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-xl mb-4 border border-gray-100 hover:border-primary/20 hover:bg-primary/5 transition"
                      >
                        <p className="font-medium text-primary">
                          {variant.name}
                        </p>
                        <p className="text-gray-600 mt-1">
                          {variant.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CocktailDefault;
