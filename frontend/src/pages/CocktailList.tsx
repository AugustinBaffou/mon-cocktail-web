import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, Clock, Star, ArrowUpDown } from "lucide-react";
import DotsLoading from "../components/DotsLoading";

// Interface pour les données de l'API
interface CocktailSummary {
  id: number;
  name: string;
  emoji: string;
  description: string;
  preparationTime: number;
  difficulty: number;
  types: {
    id: number;
    name: string;
    emoji: string;
  }[];
}

const CocktailList: React.FC = () => {
  const [cocktails, setCocktails] = useState<CocktailSummary[]>([]);
  const [filteredCocktails, setFilteredCocktails] = useState<CocktailSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"name" | "preparationTime" | "difficulty">("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [showFilters, setShowFilters] = useState(false);

  // Récupérer la liste des cocktails
  useEffect(() => {
    const fetchCocktails = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/public/cocktails/summaries");
        if (!response.ok) {
          throw new Error(`Erreur HTTP ${response.status}`);
        }
        const data = await response.json();
        setCocktails(data);
        setFilteredCocktails(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Une erreur est survenue");
        console.error("Erreur lors du chargement des cocktails:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCocktails();
  }, []);

  // Extraire tous les types uniques pour les filtres
  const allTypes = React.useMemo(() => {
    const types = new Set<string>();
    cocktails.forEach(cocktail => {
      cocktail.types.forEach(type => {
        types.add(type.name);
      });
    });
    return Array.from(types);
  }, [cocktails]);

  // Filtrer et trier les cocktails
  useEffect(() => {
    let result = [...cocktails];
    
    // Appliquer la recherche
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        cocktail => 
          cocktail.name.toLowerCase().includes(term) || 
          cocktail.description.toLowerCase().includes(term)
      );
    }
    
    // Appliquer le filtre par type
    if (activeFilter) {
      result = result.filter(cocktail => 
        cocktail.types.some(type => type.name === activeFilter)
      );
    }
    
    // Appliquer le tri
    result.sort((a, b) => {
      let comparison = 0;
      if (sortBy === "name") {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === "preparationTime") {
        comparison = a.preparationTime - b.preparationTime;
      } else if (sortBy === "difficulty") {
        comparison = a.difficulty - b.difficulty;
      }
      
      return sortDirection === "asc" ? comparison : -comparison;
    });
    
    setFilteredCocktails(result);
  }, [cocktails, searchTerm, activeFilter, sortBy, sortDirection]);

  // Fonction pour inverser l'ordre de tri
  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  // Affichage pendant le chargement
  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen flex justify-center items-center">
        <div className="text-center">
          <DotsLoading />
          <p className="mt-4 text-gray-600">Chargement des cocktails...</p>
        </div>
      </div>
    );
  }

  // Affichage en cas d'erreur
  if (error) {
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
          <h2 className="text-xl font-bold mb-2">Impossible de charger les cocktails</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 grow">
      <div className="sticky top-[72px] z-10 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <h1 className="text-2xl font-bold text-primary mb-4">Nos Cocktails</h1>
          
          {/* Barre de recherche */}
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={20} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Rechercher un cocktail..."
              className="block w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={20} className={`${activeFilter ? 'text-primary' : 'text-gray-400'}`} />
            </button>
          </div>
          
          {/* Options de filtrage et tri */}
          {showFilters && (
            <div className="bg-white p-4 rounded-xl shadow-sm mb-4 border border-gray-100">
              <div className="mb-4">
                <h3 className="font-medium mb-2">Filtrer par type</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    className={`px-3 py-1 rounded-full text-sm transition ${
                      activeFilter === null
                        ? "bg-primary text-white"
                        : "bg-primary/10 text-primary hover:bg-primary/20"
                    }`}
                    onClick={() => setActiveFilter(null)}
                  >
                    Tous
                  </button>
                  {allTypes.map((type) => (
                    <button
                      key={type}
                      className={`px-3 py-1 rounded-full text-sm transition ${
                        activeFilter === type
                          ? "bg-primary text-white"
                          : "bg-primary/10 text-primary hover:bg-primary/20"
                      }`}
                      onClick={() => setActiveFilter(type)}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Trier par</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    className={`px-3 py-1 rounded-full text-sm transition ${
                      sortBy === "name"
                        ? "bg-primary text-white"
                        : "bg-primary/10 text-primary hover:bg-primary/20"
                    }`}
                    onClick={() => setSortBy("name")}
                  >
                    Nom
                  </button>
                  <button
                    className={`px-3 py-1 rounded-full text-sm transition ${
                      sortBy === "preparationTime"
                        ? "bg-primary text-white"
                        : "bg-primary/10 text-primary hover:bg-primary/20"
                    }`}
                    onClick={() => setSortBy("preparationTime")}
                  >
                    Temps de préparation
                  </button>
                  <button
                    className={`px-3 py-1 rounded-full text-sm transition ${
                      sortBy === "difficulty"
                        ? "bg-primary text-white"
                        : "bg-primary/10 text-primary hover:bg-primary/20"
                    }`}
                    onClick={() => setSortBy("difficulty")}
                  >
                    Difficulté
                  </button>
                  <button
                    className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition flex items-center gap-1"
                    onClick={toggleSortDirection}
                  >
                    <ArrowUpDown size={14} />
                    {sortDirection === "asc" ? "Croissant" : "Décroissant"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Affichage des résultats */}
        {filteredCocktails.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-2">Aucun cocktail ne correspond à votre recherche</p>
            <button
              className="text-primary hover:underline"
              onClick={() => {
                setSearchTerm("");
                setActiveFilter(null);
              }}
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {filteredCocktails.map((cocktail) => (
              <Link
                to={`/cocktails/${cocktail.id}`}
                key={cocktail.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition group"
              >
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
                  <span className="text-8xl transform group-hover:scale-110 transition-transform duration-300">
                    {cocktail.emoji}
                  </span>
                </div>
                
                <div className="p-4">
                  <div className="mb-2 flex justify-between items-start">
                    <h3 className="text-xl font-semibold text-primary group-hover:text-secondary transition">
                      {cocktail.name}
                    </h3>
                    <div className="flex gap-1">
                      {cocktail.types.map((type) => (
                        <span key={type.id} title={type.name}>{type.emoji}</span>
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {cocktail.description}
                  </p>
                  
                  <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock size={16} />
                      <span>{cocktail.preparationTime} min</span>
                    </div>
                    
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={`${
                            i < cocktail.difficulty ? "text-orange" : "text-gray-300"
                          }`}
                          fill={i < cocktail.difficulty ? "#F1A411" : "none"}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CocktailList;