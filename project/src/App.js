import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import PetList from "./PetList";
import Navbar from "./NavBar";
import HomePage from "./HomePage";
// import Footer from "./Footer";
import UserDashboard from "./UserDashboard";
import ProfilePage from "./ProfilePage";
import PetApplicationsList from "./PetApplicationList";  // Başvuru listesi bileşeni
import PetApplicationForm from "./PetApplicationForm";    // Başvuru formu bileşeni
import MyApplications from "./MyApplications";
import ReceivedApplications from "./ReceivedApplications";

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
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/apply" element={<PetApplicationForm />} />         {/* Başvuru formu sayfası */}
          <Route path="/applications" element={<MyApplications />} />
          <Route path="/received-applications" element={<ReceivedApplications />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
