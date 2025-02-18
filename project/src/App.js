import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import PetList from "./PetList";
import Navbar from "./NavBar";
import HomePage from "./HomePage";
import UserDashboard from "./UserDashboard";
import ProfilePage from "./ProfilePage";
import MyApplications from "./MyApplications";
import ReceivedApplications from "./ReceivedApplications";
import AddPet from "./AddPet";
import MyProfile from "./MyProfile";
import About from "./About";
import Contact from "./Contact";

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
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/addpet" element={<AddPet />} />  
          <Route path="/applications" element={<MyApplications />} />
          <Route path="/received-applications/:id" element={<ReceivedApplications />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
