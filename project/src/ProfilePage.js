import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ProfilePage.css';

const UserProfile = () => {
    const { id } = useParams(); // Get user ID from URL params
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const defaultImage = "/images/default-pfp.jpg";

    useEffect(() => {
        // Fetch user data by ID
        fetch(`http://localhost:5000/api/Users/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP Error: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setUser(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Fetch error:", err);
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <p>Loading user profile...</p>;
    }

    if (error) {
        return <p className="error">Error: {error}</p>;
    }

    if (!user) {
        return <p className="error">User not found.</p>;
    }

    return (
        <div className="profile-container">
            <div className="left-container">
                <h1>Owner Details</h1>
                <div className="puppy">
                    <img
                        src="https://img.freepik.com/free-vector/hand-drawn-animal-sterilization-illustration_23-2150085157.jpg"
                        
                    />
                </div>
            </div>
            <div className="right-container">
                <header>
                    <h1>{user.name} {user.surname}</h1>
                    <div className="profile-picture">
                        <img
                            src={user.picture || defaultImage}
                            alt="Profile"
                            className="profile-img"
                        />
                    </div>
                </header>
                <div className="profile-details">
                    <p><strong>Email:</strong> {user.email}</p>

                    <h2>Pets Owned</h2>
                    {user.pets && user.pets.length > 0 ? (
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

export default UserProfile;
