import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
import DotsLoading from "../components/DotsLoading";

// Interface pour typer les données de l'API
interface Ingredient {
  id: number;
  name: string;
  parent: string | null;
  quantity?: number;
  baseQuantity?: number;
  unit?: string;
  role?: string;
  style?: string;
}

interface PreparationStep {
  id: number;
  stepOrder: number;
  description: string;
}

interface Tip {
  id: number;
  tip: string;
}

interface Type {
  id: number;
  name: string;
  emoji: string;
}

interface Variant {
  id?: number;
  name: string;
  description: string;
}

interface Cocktail {
  id: number;
  name: string;
  emoji: string;
  imageUrl: string;
  description: string;
  serviceDescription: string;
  preparationTime: number;
  difficulty: number;
  pairing: string;
  calories: number;
  alcoholPercentage: string;
  sugar: string;
  preparationSteps: PreparationStep[];
  tips: Tip[];
  ingredients: Ingredient[];
  types: Type[];
  variants: Variant[];
}

const CocktailDetail: React.FC = () => {
  const [servings, setServings] = useState(1);
  const { id } = useParams(); // Récupère l'id du cocktail depuis l'URL
  const [unit, setUnit] = useState<"oz" | "cl" | "part">("oz");
  const [isFavorite, setIsFavorite] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "ingredients" | "preparation" | "tips"
  >("ingredients");
  
  // Nouveaux états pour l'API
  const [cocktail, setCocktail] = useState<Cocktail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fonction pour convertir les unités (inchangée)
  const convertUnit = (value: number, fromUnit: string, toUnit: string) => {
    const conversionRates = {
      oz_to_cl: 30 / 10,
      cl_to_oz: 10 / 30,
      oz_to_part: 1,
      part_to_oz: 1,
      cl_to_part: 10 / 30,
      part_to_cl: 30 / 10,
    };

    const key = `${fromUnit}_to_${toUnit}` as keyof typeof conversionRates;
    return value * (conversionRates[key] || 1);
  };

  // Fonction pour partager la recette
  const shareRecipe = () => {
    if (navigator.share && cocktail) {
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

  // Charger les données du cocktail depuis l'API
  useEffect(() => {
    const fetchCocktail = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8080/public/cocktails/${id}`);
        if (!response.ok) {
          throw new Error(`Erreur HTTP ${response.status}`);
        }
        const data = await response.json();
        setCocktail(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Une erreur est survenue");
        console.error("Erreur lors du chargement du cocktail:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCocktail();
  }, [id]);

  // Chargement des préférences utilisateur (similaire à avant)
  useEffect(() => {
    // Ici, vous pourriez charger les préférences utilisateur depuis une API
    setTimeout(() => {
      setIsFavorite(Math.random() > 0.5);
      setIsBookmarked(Math.random() > 0.5);
    }, 300);
  }, []);

  // Affichage pendant le chargement
  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen flex justify-center items-center">
        <div className="text-center">
          <DotsLoading />
          <p className="mt-4 text-gray-600">Chargement du cocktail...</p>
        </div>
      </div>
    );
  }

  // Affichage en cas d'erreur
  if (error || !cocktail) {
    return (
      <div className="bg-gray-50 min-h-screen flex justify-center items-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          <h2 className="text-xl font-bold mb-2">Impossible de charger le cocktail</h2>
          <p className="text-gray-600">{error || "Veuillez réessayer plus tard"}</p>
          <Link to="/recipes" className="mt-6 inline-block bg-primary text-white px-4 py-2 rounded-lg">
            Retour à la liste
          </Link>
        </div>
      </div>
    );
  }

  // Enrichir les données d'ingrédients pour correspondre à notre interface d'affichage
  const enrichedIngredients = cocktail.ingredients.map(ing => ({
    ...ing,
    quantity: 2, // Valeur par défaut
    baseQuantity: 2, // Valeur par défaut
    unit: "oz" as const, // Valeur par défaut
  }));

  // Mise à jour des quantités en fonction des servings et de l'unité
  const updatedIngredients = enrichedIngredients.map((ing) => ({
    ...ing,
    quantity: +convertUnit(
      convertUnit(ing.baseQuantity, ing.unit, "oz") * servings,
      "oz",
      unit
    ).toFixed(2),
  }));

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
            {cocktail.types.map((type) => (
              <span
                key={type.id}
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
                    {cocktail.calories}
                  </p>
                  <p className="text-sm text-gray-500">Calories</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">
                    {cocktail.alcoholPercentage}
                  </p>
                  <p className="text-sm text-gray-500">Alcool</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">
                    {cocktail.sugar}
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

                    {/* Section ingrédients */}
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-primary mb-3">
                        Ingrédients
                      </h3>
                      {updatedIngredients.map((ingredient) => (
                        <div
                          key={ingredient.id}
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
                  </div>
                )}
                {/* Onglet préparation */}
                {activeTab === "preparation" && (
                  <div>
                    {cocktail.preparationSteps
                      .sort((a, b) => a.stepOrder - b.stepOrder)
                      .map((step) => (
                        <div
                          key={step.id}
                          className="flex items-start gap-4 p-4 rounded-xl mb-4 border border-gray-100 hover:border-primary/20 hover:bg-primary/5 transition"
                        >
                          <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                            {step.stepOrder}
                          </div>
                          <div>
                            <p>{step.description}</p>
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
                    {cocktail.tips.map((tip) => (
                      <div
                        key={tip.id}
                        className="flex items-start gap-4 p-4 rounded-xl mb-4 border border-gray-100 hover:border-primary/20 hover:bg-primary/5 transition"
                      >
                        <Leaf
                          size={20}
                          className="text-primary flex-shrink-0 mt-1"
                        />
                        <p>{tip.tip}</p>
                      </div>
                    ))}

                    {cocktail.variants && cocktail.variants.length > 0 && (
                      <>
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
                      </>
                    )}
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

export default CocktailDetail;