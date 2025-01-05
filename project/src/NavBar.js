import React from "react";
import PetsList from "./PetList";

const Navbar = () => {
    return (
        <nav style={styles.navbar}>
            <h1 style={styles.title}>Furever Home</h1>
            <ul style={styles.navLinks}>
                <li><a href="/" style={styles.link}>Home</a></li>
                <li><a href="/about" style={styles.link}>About</a></li>
                <li><a href="/Pets" style={styles.link}>Pets</a></li>
                <li><a href="/contact" style={styles.link}>Contact</a></li>
            </ul>
            <ul style={styles.navLinks}>
                
                <li><a href="/login" style={styles.link}>Login</a></li>
                <li><a href="/signup" style={styles.link}>Signup</a></li>
            </ul>

        </nav>
    );
};

const styles = {
    navbar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#333",
        color: "#fff",
    },
    title: {
        margin: 0,
    },
    navLinks: {
        listStyle: "none",
        display: "flex",
        margin: 0,
        padding: 0,
    },
    link: {
        color: "#fff",
        textDecoration: "none",
        marginLeft: "15px",
    },
};

export default Navbar;
