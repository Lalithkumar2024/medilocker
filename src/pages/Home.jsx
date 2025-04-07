import React from "react";
import EmergencyLogin from "../components/EmergencyLogin";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () =>{
    return(
        <div className="home">
            <Header/>
                <section className="homesection">
                    <h3 className="fw-bolder text-black">Welcome to MediLocker...</h3>
                    <p className="fw-light text-black">Store your documents securely</p>
                    <br />
                    <br />
                    <EmergencyLogin/>
                </section>
            <Footer/>
        </div>
    )
}   


export default Home;