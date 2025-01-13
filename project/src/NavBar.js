import React, { useState, useEffect } from "react";
import "./comp-styles.css";
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
        <nav className="navbar">
            <h1 className="navbar-title">Furever Home</h1>
            <ul className="navbar-links">
                <li><a href="/" >Home</a></li>
                <li><a href="/about" >About</a></li>
                <li><a href="/pets" >Pets</a></li>
                <li><a href="/contact" >Contact</a></li>
            </ul>
            <ul className="navbar-links">
                {isLoggedIn ? (
                    <>
                        <li><a href="/profile">My Profile</a></li>
                        <li><button className="" onClick={handleLogout}>Logout</button></li>
                    </>
                ) : (
                    <>
                        <li><a href="/login" >Login</a></li>
                        <li><a href="/signup" >Sign Up</a></li>
                    </>
                )}
            </ul>
        </nav>
    );
};



export default Navbar;
