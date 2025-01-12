import React, { useState, useEffect } from "react";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Sayfa yüklendiğinde localStorage'dan token'ı kontrol et
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true); // Token varsa giriş yapılmış kabul et
        } else {
            setIsLoggedIn(false); // Token yoksa giriş yapılmamış kabul et
        }

        // localStorage'daki değişiklikleri dinle
        const handleStorageChange = () => {
            const token = localStorage.getItem("token");
            setIsLoggedIn(!!token); // Token varsa true, yoksa false yap
        };

        // 'storage' event listener'ı ekleyin
        window.addEventListener("storage", handleStorageChange);

        // Cleanup: component unmount olduğunda event listener'ı kaldırın
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []); // Yalnızca component mount olduğunda çalışacak

    // Çıkış yapıldığında token'ı sil ve durumu güncelle
    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false); // Giriş durumu güncellenir
    };

    return (
        <nav style={styles.navbar}>
            <h1 style={styles.title}>Furever Home</h1>
            <ul style={styles.navLinks}>
                <li><a href="/" style={styles.link}>Home</a></li>
                <li><a href="/about" style={styles.link}>About</a></li>
                <li><a href="/pets" style={styles.link}>Pets</a></li>
                <li><a href="/contact" style={styles.link}>Contact</a></li>
            </ul>
            <ul style={styles.navLinks}>
                {isLoggedIn ? (
                    <>
                        <li><a href="/profile" style={styles.link}>My Profile</a></li>
                        <li><button onClick={handleLogout}>Logout</button></li>
                    </>
                ) : (
                    <>
                        <li><a href="/login" style={styles.link}>Login</a></li>
                        <li><a href="/signup" style={styles.link}>Sign Up</a></li>
                    </>
                )}
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
        backgroundColor: "#a3b899",
        color: "#fff",
    },
    title: {
        display: "flex",
        margin: 0,
        top: 0,
        padding: 0,
        color: "#fff",
        textDecoration: "none"
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
