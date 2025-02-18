import React, { useEffect, useState } from "react";
import "./AddPet.css"; // Ensure you create a corresponding CSS file for styling

const AddPet = () => {
    const [user, setUser] = useState({});
    const [newPet, setNewPet] = useState({
        name: "",
        breed: "",
        age: "",
        sex: "",
        description: "",
    });
    const [picture, setPicture] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Fetch user data
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
        } else {
            setError("User not logged in.");
        }
    }, []);

    const handleAddPet = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const token = localStorage.getItem("token");
        if (!token) {
            setError("You must be logged in to add a pet.");
            return;
        }

        const formData = new FormData();
        formData.append("name", newPet.name);
        formData.append("breed", newPet.breed);
        formData.append("age", newPet.age);
        formData.append("sex", newPet.sex);
        formData.append("description", newPet.description);
        formData.append("ownerId", user.id);
        if (picture) {
            formData.append("picture", picture);
        }

        try {
            const response = await fetch(`http://localhost:5000/api/pets`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                setSuccess("Pet added successfully!");
                setNewPet({ name: "", breed: "", age: "", sex: "", description: "" });
                setPicture(null);
            } else {
                const errorResponse = await response.json();
                setError(errorResponse.message || "Failed to add pet. Please try again.");
            }
        } catch (error) {
            console.error("An error occurred:", error);
            setError("An error occurred while adding the pet.");
        }
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPicture(file);
        }
    };

    return (
        <div className="signup-container">
            <div className="left-container">
                <h1>
                    FurEverHome
                </h1>
                <div className="puppy">
                    <img
                        src="https://img.freepik.com/free-vector/dog-background-vector-with-cute-pets-illustration_53876-127697.jpg"
                    />
                </div>
            </div>
            <div className="right-container">
                <header>
                    <h1>Yay! Ensure your little friend gets the best care!</h1>
                </header>
                <form onSubmit={handleAddPet}>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {success && <p style={{ color: "green" }}>{success}</p>}
                    <div className="set">
                        <div className="pets-name">
                            <label htmlFor="pets-name">Name</label>
                            <input
                                id="pets-name"
                                placeholder="Pet's name"
                                type="text"
                                value={newPet.name}
                                onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="pets-photo">
                            <label htmlFor="pets-upload" className="upload-label">
                                {picture ? "Change Photo" : "Upload a Photo"}
                            </label>
                            <input
                                type="file"
                                id="pets-upload"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                            {picture && (
                                <div className="image-preview">
                                    <img
                                        src={URL.createObjectURL(picture)}
                                        alt="Preview"
                                        className="preview-img"
                                    />
                                </div>
                            )}
                        </div>

                    </div>
                    <div className="set">
                        <div className="pets-breed">
                            <label htmlFor="pets-breed">Breed</label>
                            <input
                                id="pets-breed"
                                placeholder="Pet's breed"
                                type="text"
                                value={newPet.breed}
                                onChange={(e) => setNewPet({ ...newPet, breed: e.target.value })}
                                required
                            />
                        </div>
                        <div className="pets-birthday">
                            <label htmlFor="pets-birthday">Age</label>
                            <input
                                id="pets-birthday"
                                placeholder="Age in years"
                                type="number"
                                value={newPet.age}
                                onChange={(e) => setNewPet({ ...newPet, age: e.target.value })}
                                required
                            />
                        </div>
                        
                        
                    </div>
                    <div className="set">
                        <div className="pets-gender">
                            <label>Gender</label>
                            <div className="radio-container">
                                <input
                                    id="pet-gender-female"
                                    name="pet-gender"
                                    type="radio"
                                    value="Female"
                                    checked={newPet.sex === "Female"}
                                    onChange={(e) => setNewPet({ ...newPet, sex: e.target.value })}
                                />
                                <label htmlFor="pet-gender-female">Female</label>
                                <input
                                    id="pet-gender-male"
                                    name="pet-gender"
                                    type="radio"
                                    value="Male"
                                    checked={newPet.sex === "Male"}
                                    onChange={(e) => setNewPet({ ...newPet, sex: e.target.value })}
                                />
                                <label htmlFor="pet-gender-male">Male</label>
                            </div>
                        </div>
                        <div className="pets-name">
                            <label htmlFor="pets-description">Description</label>
                            <input className="radio-container"
                                id="pets-description"
                                placeholder="Describe your pet"
                                value={newPet.description}
                                onChange={(e) => setNewPet({ ...newPet, description: e.target.value })}
                                
                            ></input>
                        </div>
                    </div>
                    
                    <footer>
                        <div className="set">
                            <button type="submit" id="next">Add Pet</button>
                        </div>
                    </footer>
                </form>
            </div>
        </div>
    );
};

export default AddPet;
