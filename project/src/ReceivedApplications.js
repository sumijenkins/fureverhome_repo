import React, { useState, useEffect } from "react";
import "./ReceivedApplications.css";

const ReceivedApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch user data from localStorage (or API)
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
        } else {
            setError("User is not logged in.");
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:5000/api/applications/received/${user.id}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then((data) => {
                    setApplications(data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Error fetching received applications:", err);
                    setError("Failed to load received applications.");
                    setLoading(false);
                });
        }
    }, [user]);

    if (loading) {
        return <p>Loading received applications...</p>;
    }

    return (
        <div className="received-applications-container">
            <h1>Your Received Applications</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {applications.length === 0 ? (
                <p>No applications received yet.</p>
            ) : (
                <div className="applications-list">
                    {applications.map((application) => (
                        <div key={application.id} className="application-card">
                            <h3>Pet: {application.pet.name}</h3>
                            <p><strong>Breed:</strong> {application.pet.breed}</p>
                            <p><strong>Age:</strong> {application.pet.age}</p>
                            <p><strong>Applicant:</strong> {application.user.name}</p>
                            <p><strong>Message:</strong> {application.message}</p>
                            <p><strong>Status:</strong> {application.status}</p>
                            <button className="approve-button">Approve</button>
                            <button className="reject-button">Reject</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ReceivedApplications;
