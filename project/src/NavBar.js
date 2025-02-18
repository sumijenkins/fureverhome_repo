import React, { useState, useEffect } from "react";
import "./comp-styles.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate(); // Use the useNavigate hook

    useEffect(() => {
        // Check localStorage for token on component mount
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token); // Set login state based on token presence

        // Listen for changes to localStorage
        const handleStorageChange = () => {
            const token = localStorage.getItem("token");
            setIsLoggedIn(!!token); // Update login state
        };

        window.addEventListener("storage", handleStorageChange);

        // Cleanup: Remove event listener on component unmount
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false); // Update login state
        navigate("/"); // Navigate to home page
    };

    return (
        <nav className="navbar">
            <h1 className="navbar-title">FurEverHome</h1>
            <ul className="navbar-links">
                {isLoggedIn ? (
                    <>
                        <li><a href="/dashboard">Home</a></li>
                    </>
                ) : (
                    <>
                        <li><a href="/" >Home</a></li>
                    </>
                )}
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
            <ul className="navbar-links">
                {isLoggedIn ? (
                    <>
                        <li><a href="/my-profile">My Profile</a></li>
                        <li><button className="button" onClick={handleLogout}>Logout</button></li>
                    </>
                ) : (
                    <>
                        <li><a href="/login">Login</a></li>
                        <li><a href="/signup">Sign Up</a></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
