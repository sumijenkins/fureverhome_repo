import React from "react";
import "./Contact.css";

const Contact = () => {
    return (
        <div className="contact-container">
            <h1>Contact Us</h1>
            <p>If you have any questions, concerns, or need assistance, feel free to reach out to us:</p>
            <ul className="contact-info">
                <li>
                    <strong>Email:</strong> <a href="mailto:support@fureverhome.com">support@fureverhome.com</a>
                </li>
                <li>
                    <strong>Phone:</strong> +1 (555) 123-4567
                </li>
                <li>
                    <strong>Address:</strong> 123 Pet Lane, Animal City, PA 98765
                </li>
                <li>
                    <strong>Working Hours:</strong> Monday - Friday: 9:00 AM - 6:00 PM
                </li>
            </ul>
        </div>
    );
};

export default Contact;
