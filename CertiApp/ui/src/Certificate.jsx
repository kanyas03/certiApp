import { useLocation, Link } from "react-router-dom";
import image from './assets/image/oimage.png'

function CertificatePage() {
    const location = useLocation();
    const certificate = location.state?.certificate;

    if (!certificate) {
        return <p className="text-red-500 text-center mt-4">Certificate not found</p>;
    }

    return (
        <div className="bg-slate-100 flex justify-center min-h-screen p-10">
        <div className="py-10 px-12 bg-slate-50 w-[800px] m-auto mt-10 shadow-lg rounded-lg">
            <div className="bg-slate-50 border-4 border-black px-16 py-12">
                <h4 className="text-2xl font-bold flex justify-center">Kerala Blockchain Academy</h4>
                <img src={image} className="w-40 mx-auto mt-4" alt="Certificate Icon" />
                <p className="text-center mt-6 text-lg leading-relaxed">
                    This certifies that <b className="text-xl">{certificate.cani_name}</b><br />
                    has successfully completed <b className="text-xl">{certificate.selectcourse}</b><br />
                    with <b className="text-xl">{certificate.grade}</b> on <b className="text-xl">{certificate.Issuedate}</b>.
                </p>
            </div>
        </div>
    </div>
    );
}

export default CertificatePage;
