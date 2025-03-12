import React from "react";

const Contact = () =>{
    return(
        <div className="contact">
           <section className="contactsection">
                <h1>Contact Us</h1>
                <br />
                <br />
                <br />
                <p className="fs-4 fw-medium">We'd love to hear from you! Whether you have a question about documents, 
                    services, pricing, or anything else, our team is ready to answer all your questions.</p>
                <p className="fs-4 fw-medium">Email: <a className="link-dark text-decoration-none" href="mailto:'info@medilocker.com'">info@medilocker.com</a></p>
                <p className="fs-4 fw-medium">Phone: <a className="link-dark text-decoration-none" href="tel:+91 9898989898">+91 9898989898</a></p>
                <p className="fs-4 fw-medium">Address: 1234 Broadway St, Chennai , TN 600004.</p>
           </section>
            
        </div>
    )
}

export default Contact;