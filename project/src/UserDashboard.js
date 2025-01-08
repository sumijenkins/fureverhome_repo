import React, { useEffect, useState } from "react";
import "./UserDashboard.css"; // CSS dosyasını import ediyoruz.

const UserDashboard = () => {
    const [user, setUser] = useState({});
    const [pet, setPet] = useState([]);
    const [applications, setApplications] = useState([]);

    // Kullanıcı bilgilerini çek
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
        } else {
            fetch("/api/users")
                .then((res) => res.json())
                .then((data) => setUser(data))
                .catch((err) => console.error("Kullanıcı bilgileri yüklenemedi:", err));
        }
    }, []);

    // Hayvan listesini çek
    useEffect(() => {
        fetch("http://localhost:5000/api/pets")
            .then((res) => res.json())
            .then((data) => setPet(data))
            .catch((err) => console.error("Hayvanlar yüklenemedi:", err));
    }, []);

    // Başvuru durumlarını çek
    useEffect(() => {
        fetch("/api/applications")
            .then((res) => res.json())
            .then((data) => setApplications(data))
            .catch((err) => console.error("Başvurular yüklenemedi:", err));
    }, []);

    return (
        <div className="dashboard" style={styles.container}>
            <header className="dashboard-header">
                <h1>Welcome, {user.name}!</h1>
            </header>
            <nav className="dashboard-nav">
                <a href="/pets">All Pets</a>
                <a href="/favorites">My Favorites</a>
                <a href="/applications">My Applications</a>
            </nav>
            <main className="dashboard-main">
                <section className="animals-section">
                    <h2>Pets to Adopt</h2>
                    <ul>
                        {pet.map((pet) => (
                            <li key={pet.id}>{pet.name} ({pet.breed})</li>
                        ))}
                    </ul>
                </section>
                <section className="applications-section">
                    <h2>Application Status</h2>
                    <ul>
                        {applications.map((app) => (
                            <li key={app.id}>
                                {app.petName}: {app.status}
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
        </div>
    );
};

export default UserDashboard;

const styles = {
    container: {
        textAlign: "center",
        padding: "20px",
        backgroundImage: "url('/images/dashboard1.jpg')",
        backgroundSize: "cover", // Ensures the image covers the entire container
        backgroundRepeat: "no-repeat", // Prevents the image from repeating
        backgroundPosition: "center", // Centers the image
        height: "100vh", // Makes the container fill the viewport height
        color: "#fff", // Adjust text color for better contrast
    },

};