import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Recipes from "./pages/Recipes";
import Home from "./pages/Home";
import Surprise from "./pages/Surprise";
import NavBar from "./components/NavBar";
import Register from "./pages/Register";
import Verification from "./pages/Verification";
import Login from "./pages/Login";
import CocktailDetail from "./pages/CocktailPage";

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-background">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/surprise" element={<Surprise />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify" element={<Verification />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cocktail" element={<CocktailDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
