import React, { useEffect, useState } from "react";
import "./UserDashboard.css";

const UserDashboard = () => {
    const [user, setUser] = useState({});
    const [pet, setPet] = useState([]);
    const [applications, setApplications] = useState([]);
    const [newPet, setNewPet] = useState({ name: "", breed: "", age: "", sex: "", description: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

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
                <a href="/applications">My Applications</a>
                <a href="/addpet">Add Pet for Adoption</a>
                <a href={`/received-applications/${user.id}`}>Received Applications</a>



            </nav>
        </div>
    );
};

export default UserDashboard;

const styles = {
    container: {
        textAlign: "center",
        padding: "20px",
        backgroundImage: "url('/images/dashboard1.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: 'fixed',
        height: "100vh",
        color: "#fff",
    },
};
