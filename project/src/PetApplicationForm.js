import React, { useState } from 'react';

const PetApplicationForm = () => {
    const [userId, setUserId] = useState('');
    const [petId, setPetId] = useState('');
    const [status, setStatus] = useState('Pending');
    const [applicationDate, setApplicationDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Ensure userId and petId are integers
        const application = {
            userId: parseInt(userId, 10),
            petId: parseInt(petId, 10),
            status,
            applicationDate: new Date(applicationDate).toISOString(), // Convert to ISO 8601 format
        };

        fetch('http://localhost:5000/api/PetApplication', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(application),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Application successfully submitted:', data);
            })
            .catch(error => {
                console.error('Error submitting application:', error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>User ID:</label>
            <input
                type="number"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
            />
            <br />
            <label>Pet ID:</label>
            <input
                type="number"
                value={petId}
                onChange={(e) => setPetId(e.target.value)}
                required
            />
            <br />
            <label>Status:</label>
            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
            >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
            </select>
            <br />
            <label>Application Date:</label>
            <input
                type="date"
                value={applicationDate}
                onChange={(e) => setApplicationDate(e.target.value)}
                required
            />
            <br />
            <button type="submit">Submit Application</button>
        </form>
    );
};

export default PetApplicationForm;
