import React, { useEffect, useState } from "react";
import "./PetList.css";
import { Link } from 'react-router-dom';
const MyApplications = () => {
    const [applications, setApplications] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");

        if (!storedUser || !token) {
            setError("You must be logged in to view your applications.");
            return;
        }

        fetch(`http://localhost:5000/api/applications/user/${storedUser.id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (!res.ok) {
                    if (res.status === 404) {
                        // Handle no applications found
                        return [];
                    }
                    throw new Error("Failed to fetch applications.");
                }
                return res.json();
            })
            .then((data) => {
                if (data.length === 0) {
                    setError("You have not applied for any pets yet.");
                } else {
                    setApplications(data);
                }
            })
            .catch((err) => {
                console.error("Error fetching applications:", err);
                setError("Failed to load applications.");
            });
    
    }, []);

    return (
        <div className="pets-container">
            <h1>My Applications</h1>
            {error && <p>{error}</p>}
            <div className="pets-grid">
                {applications.map((application) => (
                    <div key={application.id} className="pet-card">
                       
                        <img
                            src={`http://localhost:5000${application.pet?.pictureUrl || "/images/default-pfp.jpg"}`}
                            alt={application.pet?.name || "Unknown Pet"}
                            className="pet-image"
                        />
                        <h2 className="pet-name">{application.pet?.name || "Unknown Pet"}</h2>
                        <p className="pet-details">Breed: {application.pet?.breed || "Unknown Breed"}</p>
                        <p className="pet-details">Age: {application.pet?.age || "Unknown Age"}</p>
                        
                        <Link to={`/profile/${application.pet.ownerId}`}> (View Owner)</Link>
                        <p className="pet-details">Message: {application.message || "No message provided."}</p>
                        <p className="pet-details">
                            Status:{" "}
                            {application.status === 0
                                ? "Waiting"
                                : application.status === 1
                                    ? "Approved"
                                    : "Rejected"}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyApplications;
