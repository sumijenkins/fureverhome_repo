import React, { useEffect, useState } from "react";
import "./MyProfile.css";

const MyProfile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");

    // Fetch user information
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");

        if (!storedUser || !token) {
            setError("You must be logged in to view your profile.");
            return;
        }

        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/users/${storedUser.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch user data.");
                }

                const data = await response.json();
                setUser(data);
            } catch (err) {
                console.error("Error fetching user:", err);
                setError(err.message || "An unexpected error occurred.");
            }
        };

        fetchUserData();
    }, []);

    if (error) {
        return (
            <div className="profile-container">
                <h1>My Profile</h1>
                <p className="error">{error}</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="profile-container">
                <h1>My Profile</h1>
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="profile-container">
            <div className="left-container">
                <h1>My Profile</h1>
                <div className="puppy">
                    <img
                        src="https://img.freepik.com/free-vector/training-home-concept-illustration_114360-28406.jpg"
                        alt="Puppy"
                    />
                </div>
            </div>
            <div className="right-container">
                
                <div className="profile-details">
                    <header>
                        <h1>{user.name} {user.surname}</h1>
                    <div className="profile-picture">
                        <img
                            src={user.picture || "/images/default-pfp.jpg"}
                            alt="Profile"
                            className="profile-img"
                        />
                    </div>
                    </header>
                    
                    
                    <p>
                        <strong>Email:</strong> {user.email}
                    </p>

                    
                    <h3>Pets</h3>
                    {user.pets?.length > 0 ? (
                        <ul>
                            {user.pets.map((pet) => (
                                <li key={pet.id}>
                                    {pet.name} ({pet.breed}, {pet.age} years old)
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No pets found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
