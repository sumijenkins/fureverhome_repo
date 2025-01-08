//import React, { useState } from "react";
import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // localStorage'dan token'ı kontrol et
        const token = localStorage.getItem("token");
        
    }, [navigate]);
    const handleLoginRedirect = () => {
        navigate("/login"); // LoginPage'e yönlendir
    };

    return (
        <div style={styles.container}>
            <h2>Welcome to Furever Home!</h2>
            <p>
                Find your perfect furry companion and give them a loving home.
            </p>
            {isLoggedIn ? (
                <div>
                    <h1>You're logged in! Go to your <a href="/profile">profile</a></h1>
                </div>
            ) : (
                <p>Please log in first.</p>
            )}
            <button className="button" role="button" onClick={handleLoginRedirect}>
                Log in Now! 
            </button>
            
        </div>
    );
};

const styles = {
    container: {
        textAlign: "center",
        padding: "20px",
        backgroundImage: "url('/images/homepage.jpg')",
        backgroundSize: "cover", // Ensures the image covers the entire container
        backgroundRepeat: "no-repeat", // Prevents the image from repeating
        backgroundPosition: "center", // Centers the image
        height: "100vh", // Makes the container fill the viewport height
        color: "#fff", // Adjust text color for better contrast
    },
   
};

export default HomePage;
