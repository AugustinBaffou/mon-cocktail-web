import React from "react";

const Surprise: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cream text-center p-6">
      <h1 className="text-3xl font-bold text-darkblue">Cocktail Surprise</h1>
      <p className="text-gray-600 mt-4">Un cocktail aléatoire pour vous surprendre !</p>

      <div className="mt-6 w-full max-w-md bg-white p-4 rounded-xl shadow-lg">
        <p className="text-lg text-darkblue">Bientôt disponible...</p>
      </div>
    </div>
  );
};


export default Surprise;