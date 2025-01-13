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

    const handleAddPet = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const token = localStorage.getItem("token"); // Kullanıcı token'ı
        if (!token) {
            setError("You must be logged in to add a pet.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/users/${user.id}/add-pet`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newPet),
            });

            if (response.ok) {
                setSuccess("Pet added successfully!");
                setNewPet({ name: "", breed: "", age: "", sex: "", description: "" });
                // Yeni eklenen hayvanı listeye ekle
                const addedPet = await response.json();
                setPet((prevPets) => [...prevPets, addedPet]);
            } else {
                setError("Failed to add pet. Please try again.");
            }
        } catch (error) {
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <div className="dashboard" style={styles.container}>
            <header className="dashboard-header">
                <h1>Welcome, {user.name}!</h1>
            </header>
            <nav className="dashboard-nav">
                <a href="/pets">All Pets</a>
                <a href="/favorites">My Favorites</a>
                <a href="/applications">My Applications</a>
                <a href="/addpet">Add Pet</a>
                <a href="/received-applications">Received Applications</a>

            </nav>
            <main className="dashboard-main">
                <section className="add-pet-section">
                    <h2>Add a New Pet</h2>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {success && <p style={{ color: "green" }}>{success}</p>}
                    <form onSubmit={handleAddPet}>
                        <input
                            type="text"
                            placeholder="Name"
                            value={newPet.name}
                            onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Breed"
                            value={newPet.breed}
                            onChange={(e) => setNewPet({ ...newPet, breed: e.target.value })}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Age"
                            value={newPet.age}
                            onChange={(e) => setNewPet({ ...newPet, age: e.target.value })}
                            required
                        />
                        <select
                            value={newPet.sex}
                            onChange={(e) => setNewPet({ ...newPet, sex: e.target.value })}
                            required
                        >
                            <option value="">Select Sex</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        <textarea
                            placeholder="Description"
                            value={newPet.description}
                            onChange={(e) => setNewPet({ ...newPet, description: e.target.value })}
                        />
                        <button type="submit">Add Pet</button>
                    </form>
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
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: 'fixed',
        height: "100vh",
        color: "#fff",
    },
};
