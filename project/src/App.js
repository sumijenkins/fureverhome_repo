// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import PetList from "./PetList";
import Navbar from "./NavBar";
import HomePage from "./HomePage";
import Footer from "./Footer";


function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/pets" element={<PetList />} />
        </Routes>
      </div>
      <div>
        <Footer />
      </div>
    </Router>
  );
}


export default App;
