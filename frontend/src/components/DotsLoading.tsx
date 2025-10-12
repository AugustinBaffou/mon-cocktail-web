import { AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

const DotsLoading = ({ message = "" }) => {
  const [activeDot, setActiveDot] = useState(0);
  const [showDelayMessage, setShowDelayMessage] = useState(false);

  useEffect(() => {
    // Animation des points
    const interval = setInterval(() => {
      setActiveDot((prev) => (prev + 1) % 3);
    }, 400);

    // Timer pour afficher le message après 10 secondes
    const timer = setTimeout(() => {
      setShowDelayMessage(true);
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="mt-8 flex flex-col items-center justify-center">
      {/* Message principal */}
      {message && (
        <p className="mb-3 text-base text-gray-700 font-medium">
          {message}
        </p>
        )
      }

      {/* Animation des points */}
      <div className="flex justify-center gap-2">
        <div
          className={`h-2 w-2 rounded-full transition-opacity duration-300 ${
            activeDot === 0 ? 'bg-green opacity-100' : 'bg-green opacity-30'
          }`}
        ></div>
        <div
          className={`h-2 w-2 rounded-full transition-opacity duration-300 ${
            activeDot === 1 ? 'bg-orange opacity-100' : 'bg-orange opacity-30'
          }`}
        ></div>
        <div
          className={`h-2 w-2 rounded-full transition-opacity duration-300 ${
            activeDot === 2 ? 'bg-secondary opacity-100' : 'bg-secondary opacity-30'
          }`}
        ></div>
      </div>
      
      <div
        className={`mt-4 transform transition-all duration-700 ease-out ${
          showDelayMessage
            ? 'translate-y-0 opacity-100'
            : '-translate-y-4 opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-700">
            <span className="font-medium">Temps de chargement prolongé :</span> En cas de longue période d'inactivité, 
            le serveur peut mettre une minute à redémarrer.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DotsLoading;