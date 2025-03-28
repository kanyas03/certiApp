import { useState } from "react";

const IssueCertificate = () => {
  const [formData, setFormData] = useState({
    CertificateId: "",
    SelectCourse: "certificated blockchain associate",
    CandidateName: "",
    Grade: "",  
    IssueDate: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting data:", formData);  

    try {
      const response = await fetch("api/issuecertificate", {  
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert("Certificate issued successfully");
        setFormData({
          CertificateId: "",
          SelectCourse: "certificated blockchain associate",
          CandidateName: "",
          Grade: "",
          IssueDate: ""
        });
      } else {
        const errorText = await response.text();
        console.error("Failed to issue certificate:", errorText);
        alert("Failed to issue certificate: " + errorText);
      }
    } catch (error) {
      console.error("Error issuing certificate:", error);
    }
  };

  return (
    <div className="flex flex-col items-center bg-slate-300 min-h-screen p-10">
      <h3 className="text-3xl font-bold mb-6">Certificate DApp</h3>
      <form className="bg-slate-100 p-6 rounded-xl w-96" onSubmit={handleSubmit}>
        <h4 className="text-lg font-bold mb-4">Issue New Certificate</h4>
        
     
        <label>Select Course:</label>
        <select name="SelectCourse" value={formData.SelectCourse} onChange={handleChange} className="w-full border p-2 rounded mb-3">
          <option value="certificated blockchain associate">Blockchain Associate</option>
          <option value="certificated UI/UX associate">UI/UX Associate</option>
          <option value="certificated Cyber security associate">Cyber Security Associate</option>
        </select>

       
        <label>Certificate ID:</label>
        <input type="text" name="CertificateId" value={formData.CertificateId} onChange={handleChange} className="w-full border p-2 rounded mb-3" required />

        
        <label>Candidate Name:</label>
        <input type="text" name="CandidateName" value={formData.CandidateName} onChange={handleChange} className="w-full border p-2 rounded mb-3" required />

       
        <label>Select Grade:</label>
        <select name="Grade" value={formData.Grade} onChange={handleChange} className="w-full border p-2 rounded mb-3" required>
          <option value="">Select a Grade</option>  
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>

        {/* Issue Date */}
        <label>Issue Date:</label>
        <input type="date" name="IssueDate" value={formData.IssueDate} onChange={handleChange} className="w-full border p-2 rounded mb-3" required />

        {/* Submit Button */}
        <button type="submit" className="w-full bg-slate-500 text-white p-2 rounded">Issue Certificate</button>
      </form>
    </div>
  );
};

export default IssueCertificate;
