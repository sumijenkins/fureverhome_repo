import React from "react";
import "./HomePage.css";

const HomePage = () => {
    return (
        <div style={styles.container}>
            <h2>Welcome to Furever Home!</h2>
            <p>
                Find your perfect furry companion and give them a loving home.
            </p>
            <button className="button" role="button">
                Button test
            </button>
            
        </div>
    );
};

const styles = {
    container: {
        textAlign: "center",
        padding: "20px",
        backgroundImage: "url('/images/pet-background.jpg')",
        backgroundSize: "cover", // Ensures the image covers the entire container
        backgroundRepeat: "no-repeat", // Prevents the image from repeating
        backgroundPosition: "center", // Centers the image
        height: "100vh", // Makes the container fill the viewport height
        color: "#fff", // Adjust text color for better contrast
    },
    
    
    
    
};

export default HomePage;
