import React,{ useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const Hospital = () => {

const [location, setLocation] = useState(null);
const [hospitals, setHospitals] = useState([]);
  
useEffect(() => {
    navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          fetchHospitals(latitude, longitude);
        },
        async () => {
          try {
            const res = await axios.get("https://ipapi.co/json/");
            setLocation({ lat: res.data.latitude, lng: res.data.longitude });
            fetchHospitals(res.data.latitude, res.data.longitude);
          } catch (error) {
            console.error("Error fetching location from IP:", error);
            setLocation({ lat: 13.0827, lng: 80.2707 });
            fetchHospitals(13.0827, 80.2707);
          }
        }
      );
}, []);
  
const fetchHospitals = async (lat, lng) => {
    try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&q=hospital+near+${lat},${lng}`
        );
        setHospitals(response.data);
    } catch (error) {
        console.error("Error fetching hospitals:", error);
    }
};
  

return(
    <div className="hospital">
        <Header/>
        <section className="hospitalsection">
            <h3>Find NearBy Hospitals</h3>
            <br />
            <div>
                {location ? (
                    <MapContainer center={[location.lat, location.lng]} zoom={12} style={{ height: "500px", width: "100%" ,border:"5px solid",borderRadius:"50px",color:"#058f5a" }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={[location.lat, location.lng]}>
                        <Popup>Your Location</Popup>
                    </Marker>
                    {hospitals.map((hospital, index) => (
                        <Marker key={index} position={[hospital.lat, hospital.lon]}>
                        <Popup>{hospital.display_name}</Popup>
                        </Marker>
                    ))}
                    </MapContainer>
                ) : (
                    <p>Loading map...</p>
                )}
            </div>
        </section> 
        <Footer/>
    </div>
    )
}

export default Hospital;