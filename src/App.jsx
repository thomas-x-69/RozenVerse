import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import WormholeAnimation from "./components/WormholeAnimation";
import PlanetDetail from "./components/PlanetDetail";
import SpaceScene from "./components/SpaceScene";
import { planets, dwarfPlanets, asteroids } from "./data/celestialObjects";
import "./index.css";

function App() {
  const [showWormhole, setShowWormhole] = useState(true);

  const handleAnimationComplete = () => {
    setShowWormhole(false);
  };

  const allItems = [...planets, ...dwarfPlanets, ...asteroids];

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            showWormhole ? (
              <WormholeAnimation
                onAnimationComplete={handleAnimationComplete}
              />
            ) : (
              <LandingPage allItems={allItems} />
            )
          }
        />
        <Route
          path="/planet/:id"
          element={<PlanetDetail allItems={allItems} />}
        />
        <Route path="/explore" element={<SpaceScene />} />
      </Routes>
    </Router>
  );
}

export default App;
