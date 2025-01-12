import React, { useState, useEffect } from "react";

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch("/api/users/current");
            const data = await response.json();
            setUser(data);
        };

        const fetchApplications = async () => {
            const response = await fetch(`/api/applications?userId=${user.id}`);
            const data = await response.json();
            setApplications(data);
        };

        fetchUser();
        if (user) fetchApplications();
    }, [user]);

    return (
        <div>
            <h2>Welcome, {user ? user.name : "Loading..."}</h2>
            <h3>Your Adoption Applications</h3>
            <table>
                <thead>
                    <tr>
                        <th>Pet Name</th>
                        <th>Status</th>
                        <th>Message</th>
                    </tr>
                </thead>
                <tbody>
                    {applications.map((application) => (
                        <tr key={application.id}>
                            <td>{application.pet.name}</td>
                            <td>{application.status}</td>
                            <td>{application.message}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProfilePage;
