import React, { useEffect, useState } from "react";
import "./MyApplications.css";

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
            .then((res) => res.json())
            .then((data) => setApplications(data))
            .catch((err) => {
                console.error("Error fetching applications:", err);
                setError("Failed to load applications.");
            });
    }, []);

    return (
        <div className="applications-container">
            <h1>My Applications</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div className="applications-list">
                {applications.length === 0 ? (
                    <p>You have no applications yet.</p>
                ) : (
                    applications.map((application) => (
                        <div className="application-card" key={application.id}>
                            <h3>Pet: {application.petName}</h3>
                            <p>Status: {application.status}</p>
                            <p>Message: {application.message}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MyApplications;
