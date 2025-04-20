import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Swal from "sweetalert2";
import { getAllDocuments, downloadDocument, shareDocument } from "../api/DocumentService";
import { getPatientId } from "../api/PatientService";

const Documents = () => {
  const [activeTab, setActiveTab] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [documents, setDocuments] = useState([]);

  const user = JSON.parse(localStorage.getItem("users"));
  const userId = user.user_id;

  const handleTabChange = (tab) => setActiveTab(tab);


  

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await getAllDocuments();
        const allDocs = res.data;
        const patient = await getPatientId(userId);
        const patientId = patient.data;
        const filteredDocs = allDocs.filter(doc => doc.patient.patient_id === patientId);
        setDocuments(filteredDocs);
      } catch (err) {
        console.error("Error fetching documents:", err);
      }
    };
    fetchDocuments();
  }, [userId]);

  const handleDownload = async (fileName) => {
    try {
      const response = await downloadDocument(fileName);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Error downloading document:", err);
    }
  };

  const handleShare = async (fileName) => {
    try {
      const response = await shareDocument(fileName);
      const shareUrl = response.data;
  
      Swal.fire({
        title: "Share Document",
        text: "Choose a sharing option",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Copy URL",
        cancelButtonText: "Share via WhatsApp",
        showDenyButton: true,
        denyButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          navigator.clipboard.writeText(shareUrl);
          Swal.fire("Copied!", "The URL has been copied to clipboard.", "success");
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          const whatsappUrl = `https://wa.me/?text=${encodeURIComponent("Check this document: " + shareUrl)}`;
          window.open(whatsappUrl, "_blank");
        }
      });
  
    } catch (err) {
      console.error("Error sharing document:", err);
      Swal.fire("Error", "Could not generate shareable link.", "error");
    }
  };
  

  const getTabs = () => {
    const tabs = new Set();
    documents.forEach((doc) => tabs.add(doc.fileType.replace(".", "").toUpperCase()));
    return Array.from(tabs);
  };

  const filteredDocuments = documents.filter((doc) => {
    const matchesTab =
      activeTab === "ALL" || doc.fileType.replace(".", "").toUpperCase() === activeTab;
    const matchesSearch = doc.fileName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="document">
      <Header />
      <section className="documentsection">
        <div className="container mt-4">
          <h2 className="mb-4 text-center">My Document Center</h2>

          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <button
                className={`btn button me-2 ${activeTab === "ALL" ? "btn-success" : "btn-outline-success"}`}
                onClick={() => handleTabChange("ALL")}>
                ALL
              </button>
              {getTabs().map((tab) => (
                <button
                  key={tab}
                  className={`btn button me-2 ${activeTab === tab ? "btn-success" : "btn-outline-success"}`}
                  onClick={() => handleTabChange(tab)}>
                  {tab}
                </button>
              ))}
            </div>
            <input
              type="text"
              className="form-control w-25"
              placeholder="Search documents..."
              onChange={(e) => setSearchTerm(e.target.value)}/>
          </div>

          <div className="row justify-content-center">
            {filteredDocuments.length > 0 ? (
              filteredDocuments.map((doc, index) => (
                <div key={index} className="col-md-4 d-flex justify-content-center">
                  <div className="card p-4 text-center shadow-sm mb-4" style={{ width: "18rem" }}>
                    <h6 className="mb-3">{doc.fileName}</h6>
                    <div>
                      <button className="btn btn-outline-primary me-2" onClick={() => handleShare(doc.fileName)}>
                        Share
                      </button>
                      <button className="btn btn-outline-success" onClick={() => handleDownload(doc.fileName)}>
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center mt-5">
                <h5>No documents available</h5>
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Documents;
