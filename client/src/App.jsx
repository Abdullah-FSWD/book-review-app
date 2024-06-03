import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Favorites from "./components/Favorites";

const App = () => {
  const [user, setUser] = useState(null);

  const [favorites, setFavorites] = useState([]);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <Router>
      <div className="App">
        <Navbar user={user} onLogout={handleLogout} />
        <Routes>
          <Route
            path="/"
            element={user ? <Home user={user} /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup setUser={setUser} />} />
          <Route
            path="/profile"
            element={user ? <div>Profile Page</div> : <Navigate to="/login" />}
          />

          <Route
            path="/favorites"
            element={<Favorites user={user} favorites={favorites} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
