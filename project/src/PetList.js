import React, { useState, useEffect } from 'react';

const PetsList = () => {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

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
        <div>
            <h1>Pets for Adoption</h1>
            {error && <p>Error: {error}</p>}
            <ul>
                {pets.length === 0 ? (
                    <p>No pets available for adoption.</p>
                ) : (
                    pets.map((pet) => (
                        <li key={pet.id}>
                            <h2>{pet.name}</h2>
                            <p>Age: {pet.age}</p>
                            <p>Breed: {pet.breed}</p>
                            <button onClick={() => handleAdopt(pet.id)}>Apply for Adoption</button>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default PetsList;
