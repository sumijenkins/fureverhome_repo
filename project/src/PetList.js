import React, { useState, useEffect } from 'react';
import "./PetList.css";
import { Link } from 'react-router-dom';

const PetsList = () => {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const defaultImage = "/images/default-pfp.jpg";

    useEffect(() => {
        // Fetch pets data
        fetch('http://localhost:5000/api/pets')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP Error: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setPets(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Fetch error:", err);
                setError(err.message);
                setLoading(false);
            });

        // Fetch user data from localStorage (or API)
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);  // Set user state if user exists
        } else {
            setError("User is not logged in.");
            setLoading(false);
        }
    }, []);

    const handleAdopt = async (petId) => {
        if (!user) {
            alert("You need to be logged in to apply for adoption.");
            return;
        }

        try {
            const application = {
                userId: user.id,
                message: "I would like to adopt this pet",
            };

            const response = await fetch(`http://localhost:5000/api/applications/apply/${petId}`, {
                method: "POST",
                body: JSON.stringify(application),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                alert("Application sent successfully!");
            } else {
                // Check if response contains JSON
                const contentType = response.headers.get("Content-Type");
                if (contentType && contentType.includes("application/json")) {
                    const errorData = await response.json(); // Parse error data
                    alert(`An error occurred: ${errorData.message || 'Unknown error'}`);
                } else {
                    const errorText = await response.text(); // Fallback to plain text
                    alert(`An error occurred: ${errorText || 'Unknown error'}`);
                }
            }
        } catch (error) {
            console.error("Error sending adoption application:", error);
            alert("An error occurred while applying for adoption. Please check the console for details.");
        }
    };

    if (loading) {
        return <p>Loading pets...</p>;
    }

    return (
        <div className='pets-container'>
            <h1 className="pets-title">Pets for Adoption</h1>
            <div className="pets-grid">
                {pets.map((pet) => (
                    <div className="pet-card" key={pet.id}>
                        <img
                            src={`http://localhost:3000${pet.pictureUrl || '/images/default-pfp.jpg'}`}
                            alt={pet.name}
                            className="pet-image"
                        />


                        <h2 className="pet-name">{pet.name}</h2>
                        <p className="pet-details">Breed: {pet.breed}</p>
                        <p className="pet-details">Age: {pet.age}</p>
                        <p className='pet-details'>{pet.description}</p>
                        <p className="pet-details">
                            Owner: <span>{pet.ownerName}</span>
                            <Link to={`/profile/${pet.ownerId}`}> (View Profile)</Link>
                        </p>

                        <button className="button" onClick={() => handleAdopt(pet.id)}>Adopt</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PetsList;
