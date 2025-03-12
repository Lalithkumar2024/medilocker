import React, { useState } from "react";

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
        <section className="documentsection">
            <div className="container mt-4">
            <h2 className="mb-3">My Document Center</h2>
            <div className="d-flex justify-content-between align-items-center mb-3">
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
            <div className="card p-3">
                <h5>{activeTab}</h5>
                <ul className="list-group">
                {data[activeTab]
                    .filter((item) => item.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((item, index) => (
                    <li key={index} className="list-group-item">
                        {item}
                    </li>
                    ))}
                </ul>
            </div>
            </div>        
        </section>
    </div>
  );
};

export default Documents;
