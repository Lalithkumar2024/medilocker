import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const About = () =>{
    return(
        <div className="about">
            <Header />
                <section className="aboutsection">
                
                <img src="/assets/logobgrem.png" alt="medilocker logo" />
                <div className="about-content">
                    <p className="fw-bold text-black">Medilocker is a secure web application designed for storing, managing, and sharing medical records online. It ensures easy access to health documents anytime while keeping them encrypted and private. With seamless sharing options, users can quickly provide their medical history to doctors or caregivers, making healthcare management hassle-free and efficient.</p>
                </div>
                </section>
            <Footer />
        </div>
    )
}

export default About;