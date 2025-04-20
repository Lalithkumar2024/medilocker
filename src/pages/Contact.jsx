import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Swal from "sweetalert2";

const Contact = () =>{

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [subject,setSubject] = useState('');
    const [message,setMessage] = useState('');

    const isValidEmail = (signUpEmail,loginEmail) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(signUpEmail,loginEmail);

    const handleSubmit = (e)=>{
        e.preventDefault();

        if (!name.trim()) {
            Swal.fire("Error", "Name cannot be empty", "error");
            return;
        }
        if (!isValidEmail(email)) {
            Swal.fire("Error", "Please enter a valid email address", "error");
            return;
        }
        if (!subject) {
            Swal.fire("Error", "Subject cannot be empty", "error");
            return;
        }
        if (!message) {
            Swal.fire("Error", "Message cannot be empty", "error");
            return;
        }
        Swal.fire("Success", "Feedback Sent Successfully!", "success");
    }   

    return(
        <div className="contact">
           <Header/>
                <section className="contactsection">
                    <h1 className="text-black">Contact Us</h1>
                    <br />
                    <br />
                    <div className="contact-content">
                        <p className="fs-4 fw-medium text-black">We'd love to hear from you! Whether you have a question about documents, 
                                services, pricing, or anything else, our team is ready to answer all your questions.</p>
                        <p className="fs-4 fw-medium text-black">Email: <a className="link-dark text-decoration-none text-black" href="mailto:'info@medilocker.com'">info@medilocker.com</a></p>
                        <p className="fs-4 fw-medium text-black">Phone: <a className="link-dark text-decoration-none text-black" href="tel:+91 9898989898">+91 9898989898</a></p>
                        <p className="fs-4 fw-medium text-black">Address: 1234 Broadway St, Chennai , TN 600004.</p>
                    </div>
                    <br />
                    <br />
                    <h3 className="card-title p-3 text-black">Share us your feedback</h3>
                    <br />
                    <div className="feedbackform card">
                        <div className="card-body">
                            <form>
                                <h3 className="pb-4">Help Us Improve!</h3>
                                <div className="form-floating mb-3">
                                    <input type="text"
                                        id="floatingName"
                                        name="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter your Name"
                                        required
                                        autoComplete="off"
                                        className="form-control" />
                                    <label htmlFor="floatingName">Name</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="email"
                                            id="floatingEmail"
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your Email"
                                            required
                                            autoComplete="off"
                                            className="form-control" />
                                    <label htmlFor="floatingEmail">Email</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="text"
                                        id="floatingSubject"
                                        name="subject"
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        placeholder="Enter your Subject"
                                        required
                                        autoComplete="off"
                                        className="form-control" />
                                    <label htmlFor="floatingSubject">Subject</label>
                                </div>
                                <div class="form-floating">
                                    <textarea class="form-control" 
                                        placeholder="Leave a comment here" 
                                        value={message}
                                        onChange={(e)=> setMessage(e.target.value)}
                                        id="floatingTextarea2"
                                        required
                                        autoComplete="off">
                                    </textarea>
                                    <label for="floatingTextarea2">Comments</label>
                                </div>
                                <div className="col-12 mt-4">
                                    <button type="submit" className="btn btn-success w-100" onClick={handleSubmit}>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>            
                </section>
           <Footer/>
        </div>
    );
};

export default Contact;