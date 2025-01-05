import React from "react";

const Footer = () => {
    return (
        <footer style={styles.footer}>
            <p>&copy; 2024 Furever Home. All rights reserved.</p>
        </footer>
    );
};

const styles = {
    footer: {
        textAlign: "center",
        padding: "10px 0",
        backgroundColor: "#333",
        color: "#fff",
        marginTop: "20px",
    },
};

export default Footer;
