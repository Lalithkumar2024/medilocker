import React from "react";
import EmergencyLogin from "../components/EmergencyLogin";

const Home = () =>{
    return(
        <div className="home">
            <section className="homesection">
                <h3 className="fw-bolder">Welcome to MediLocker...</h3>
                <p className="fw-light">Store your documents securely</p>
                <br />
                <br />
                <EmergencyLogin/>
            </section>
        </div>
    )
}   


export default Home;