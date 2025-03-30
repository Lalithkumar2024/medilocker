import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Documents = () => {
  const [activeTab, setActiveTab] = useState("Documents");
  const [searchTerm, setSearchTerm] = useState("");

  const data = {
    Documents: ["Medical Report.pdf", "Lab Test Results.docx", "Health Summary.txt"],
    Xrays: ["Chest X-ray.png", "Dental X-ray.jpg", "Spine MRI.jpeg"],
    Prescriptions: ["Blood Pressure Medicine.pdf", "Diabetes Treatment.docx"],
  };

  const handleTabChange = (tab) => setActiveTab(tab);

  return (
    <div className="document">
      <Header />
      <section className="documentsection">
        <div className="container mt-4">
          <h2 className="mb-4 text-center">My Document Center</h2>

          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              {Object.keys(data).map((tab) => (
                <button
                  key={tab}
                  className={`btn me-2 ${activeTab === tab ? "btn-success" : "btn-outline-success"}`}
                  onClick={() => handleTabChange(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            <input
              type="text"
              className="form-control w-25"
              placeholder="Search documents..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="row justify-content-center">
            {data[activeTab]
              .filter((item) => item.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((item, index) => (
                <div key={index} className="col-md-4 d-flex justify-content-center">
                  <div className="card p-4 text-center shadow-sm mb-4" style={{ width: "18rem" }}>
                    <h6 className="mb-3">{item}</h6>
                    <div>
                      <button className="btn btn-primary me-2" onClick={() => alert(`Viewing ${item}`)}>
                        View
                      </button>
                      <button className="btn btn-success" onClick={() => alert(`Downloading ${item}`)}>
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Documents;
