import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Recipes from "./pages/Recipes";
import Home from "./pages/Home";
import Surprise from "./pages/Surprise";
import NavBar from "./components/NavBar";

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-background">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/surprise" element={<Surprise />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
