import React from "react";
import "./About.css";

const About = () => {
    return (
        <div className="about-body">
            <div className="about-container">
                <h1>About Us</h1>
                <section className="about-section">
                    <h2>Welcome to FurEverHome!</h2>
                    <p>
                        At <strong>FurEverHome</strong>, we believe every pet deserves a loving home. Our mission is to
                        connect pets in need with compassionate individuals and families who are ready to provide them with care,
                        comfort, and companionship.
                    </p>
                </section>

                <section className="about-section">
                    <h2>What We Do</h2>
                    <p>
                        Our platform is designed to make the pet adoption process simple, transparent, and effective for both adopters
                        and pet owners. Whether you're looking to adopt a furry friend or rehome a pet you can no longer care for,
                        we’re here to help.
                    </p>
                    <ul>
                        <li>
                            <strong>For Pet Owners:</strong> Easily list your pets for adoption by providing their details and pictures.
                            We help ensure your pet finds the right home.
                        </li>
                        <li>
                            <strong>For Adopters:</strong> Browse through a wide range of pets, learn about their unique traits, and
                            apply to adopt directly through our platform.
                        </li>
                        <li>
                            <strong>For Everyone:</strong> Build a community of pet lovers who care deeply about animal welfare.
                        </li>
                    </ul>
                </section>

                <section className="about-section">
                    <h2>Features of Our Platform</h2>
                    <ul>
                        <li>
                            <strong>User-Friendly Interface:</strong> A simple and intuitive design for easy navigation.
                        </li>
                        <li>
                            <strong>Secure Profiles:</strong> Users can create secure accounts to manage their adoption applications and
                            pet listings.
                        </li>
                        <li>
                            <strong>Comprehensive Pet Profiles:</strong> Each pet profile includes essential details like age, breed,
                            sex, and a description, along with adorable pictures.
                        </li>
                        <li>
                            <strong>Application Management:</strong> Pet owners can review, approve, or reject adoption applications
                            seamlessly.
                        </li>
                        <li>
                            <strong>Real-Time Updates:</strong> Stay informed about the status of your applications and pet listings.
                        </li>
                    </ul>
                </section>

                <section className="about-section">
                    <h2>Why Choose Us?</h2>
                    <p>
                        We are passionate about creating a positive impact on animal welfare. Our platform is built with love and
                        dedication, using the latest technology to ensure a smooth and reliable experience for all users.
                    </p>
                    <p>
                        By choosing <strong>FurEverHome</strong>, you’re not just adopting a pet—you’re giving them a second
                        chance at happiness.
                    </p>
                </section>

                <section className="about-section">
                    <h2>Our Vision</h2>
                    <p>
                        We envision a world where every pet has a safe and loving home. Together, we can reduce the number of homeless
                        pets and promote responsible pet ownership.
                    </p>
                </section>
            </div>

        </div>
        
    );
};

export default About;
