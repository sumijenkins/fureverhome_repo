import React, { useState, useEffect } from 'react';

const PetsList = () => {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    

    useEffect(() => {
        fetch('http://localhost:5000/api/pets')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP Error: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => setPets(data))
            .catch((err) => {
                console.error("Fetch error:", err);
                setError(err.message);
            });
    }, []);

    return (
        <div>
            <h1>Pets for Adoption</h1>
            <ul>
                {pets.length === 0 ? (
                    <p>No pets available for adoption.</p> // Eğer pets dizisi boşsa, mesaj gösteriyoruz
                ) : (
                    pets.map(pet => (
                        <li key={pet.id}>
                            <h2>{pet.name}</h2>
                            <p>Age: {pet.age}</p>
                            <p>Breed: {pet.breed}</p>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default PetsList;
