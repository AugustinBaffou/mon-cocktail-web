import React from "react";

const Recipes: React.FC = () => {
  return (
    <div className=" grow flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-3xl font-bold text-primary">Les Recettes</h1>
      <p className="text-secondary italic mt-4">
        Explorez notre collection de cocktails.
      </p>

      <div className="mt-6 w-full max-w-md p-4 rounded-xl">
        <p className="text-lg text-darkblue">Bientôt disponible...</p>
      </div>
    </div>
  );
};

export default Recipes;
