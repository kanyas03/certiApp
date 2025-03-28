import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import image from "./assets/image/oimage.png";

function ViewCertificate() {
    const [certificateId, setCertificateId] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchCertificate = async () => {
        setError(null);
        try {
            const response = await fetch(`/api/viewCertificate?CertificateId=${certificateId}`);
            const data = await response.json();
            if (response.ok) {
                navigate("/certificate", { state: { certificate: data.data } });
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError("Failed to fetch certificate");
        }
    };

    const handleLogout = async () => {
        try {
            const response = await fetch("/logout", { method: "GET", credentials: "include" });
            if (response.ok) {
                alert("Successfully logged out");
                navigate("/");
            } else {
                alert("Logout failed");
            }
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <div className="bg-slate-100 min-h-screen">
            {/* Top Navigation with Logout */}
            <div className="flex justify-between p-4 bg-slate-200 shadow-md">
                <h2 className="text-xl font-bold text-slate-600">Certificate DApp</h2>
                <div>
                    <Link className="no-underline text-black px-4 py-2 rounded hover:bg-slate-500" to="/">Home</Link>
                    <Link className="no-underline text-black px-4 py-2 rounded hover:bg-slate-500 ml-2" to="/Issuecertificate">Issue Certificate</Link>
                    <button onClick={handleLogout} className="ml-4  text-black px-4 py-2 rounded hover:bg-slate-500">
                        Logout
                    </button>
                </div>
            </div>

            {/* Certificate Search Section */}
            <div className="flex flex-col items-center mt-10">
                <img src={image} className="w-60 mb-4" alt="Certificate" />
                <div className="flex">
                    <input
                        type="text"
                        placeholder="Enter certificate ID to view"
                        value={certificateId}
                        onChange={(e) => setCertificateId(e.target.value)}
                        className="border-2 border-current p-2"
                    />
                    <button onClick={fetchCertificate} className="border-solid rounded text-white text-sm w-20 h-10 bg-slate-500 ml-2">
                        Search
                    </button>
                </div>
                {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>
        </div>
    );
}

export default ViewCertificate;
