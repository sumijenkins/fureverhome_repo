import React, { useState } from 'react';

const PetApplicationForm = () => {
    const [userId, setUserId] = useState('');
    const [petId, setPetId] = useState('');
    const [status, setStatus] = useState('Pending');
    const [applicationDate, setApplicationDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const application = {
            userId,
            petId,
            status,
            applicationDate,
        };

        fetch('http://localhost:5000/api/Application', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(application),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Başvuru başarıyla gönderildi:', data);
            })
            .catch(error => {
                console.error('Başvuru gönderilirken hata oluştu:', error);
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
            <input
                type="text"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
            />
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
