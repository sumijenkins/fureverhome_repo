import React, { useState, useEffect } from "react";
import "./PetList.css";

const ReceivedApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");

        if (!storedUser || !token) {
            setError("You must be logged in to view your applications.");
            return;
        }

        fetch(`http://localhost:5000/api/applications/received/${storedUser.id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (response.status === 404) {
                    return [];
                }
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                const sortedApplications = data.sort(
                    (a, b) => new Date(b.applicationDate) - new Date(a.applicationDate)
                );
                setApplications(sortedApplications);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching received applications:", err);
                setError("Failed to load received applications.");
                setLoading(false);
            });
    }, []); // 


    const handleStatusUpdate = async (applicationId, newStatus) => {
        const confirmation = window.confirm(
            `Are you sure you want to ${newStatus === 1 ? "approve" : "reject"
            } this application?`
        );

        if (!confirmation) return;

        try {
            const response = await fetch(
                `http://localhost:5000/api/applications/update/${applicationId}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ status: newStatus }),
                }
            );

            if (response.ok) {
                setApplications((prevApplications) =>
                    prevApplications.map((application) =>
                        application.id === applicationId
                            ? { ...application, status: newStatus }
                            : application
                    )
                );
                alert(
                    newStatus === 1
                        ? "Application approved successfully!"
                        : "Application rejected successfully!"
                );
            } else {
                alert("Failed to update the application status.");
            }
        } catch (error) {
            console.error("Error updating application status:", error);
            alert("An error occurred while updating the status.");
        }
    };

    if (loading) {
        return <p>Loading received applications...</p>;
    }

    return (
        <div className="pets-container">
            <h1>Your Received Applications</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {applications.length === 0 ? (
                <p>No applications received yet.</p>
            ) : (
                <div className="pets-grid">
                    {applications.map((application) => (
                        <div key={application.id} className="pet-card">
                            {/* Check if pet exists before accessing its properties */}
                            {application.pet && (
                                <img
                                    src={`http://localhost:5000${application.pet.pictureUrl || "/images/default-pfp.jpg"}`}
                                    alt={application.pet.name || "Unknown Pet"}
                                    className="pet-image"
                                />
                            )}
                            {/* Check if pet exists before accessing its properties */}
                            <h2 className="pet-name">{application.pet?.name || "Pet Name Unavailable"}</h2>
                            {/* Check if pet exists before accessing its properties */}
                            <p className="pet-details">Breed: {application.pet?.breed || "Breed Unavailable"}</p>
                            {/* Check if pet exists before accessing its properties */}
                            <p className="pet-details">Age: {application.pet?.age || "Age Unavailable"}</p>

                            {/* Check if user exists before accessing its properties */}
                            <p className="pet-details">Applicant: {application.user?.name || "Applicant Name Unavailable"}</p>
                            <p className="pet-details">
                                {new Date(application.applicationDate).toLocaleDateString()} {" "} {/* Date */}
                                {new Date(application.applicationDate).toLocaleTimeString()}          {/* Time */}
                            </p>
                            <p className="pet-details">
                                Status:{" "}
                                {application.status === 0
                                    ? "Waiting"
                                    : application.status === 1
                                        ? "Approved"
                                        : "Rejected"}
                            </p>
                            {application.status === 0 && (
                                <>
                                    <button
                                        className="button"
                                        onClick={() => handleStatusUpdate(application.id, 1)}
                                    >
                                        Approve
                                    </button>
                                    <button
                                        className="button"
                                        onClick={() => handleStatusUpdate(application.id, 2)}
                                    >
                                        Reject
                                    </button>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ReceivedApplications;
