import React, { useEffect, useState } from "react";

const ProfilePage = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            // Burada token ile backend'den kullanıcı bilgilerini alabilirsiniz
            fetch("http://localhost:5000/api/users/profile", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    setUser(data.user); // Kullanıcı bilgisini state'e kaydediyoruz
                })
                .catch((error) => console.error("Error fetching user data:", error));
        }
    }, []);

    return (
        <div>
            {user ? (
                <div>
                    <h1>My Profile</h1>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                </div>
            ) : (
                <h1>Loading profile...</h1>
            )}
        </div>
    );
};

export default ProfilePage;
