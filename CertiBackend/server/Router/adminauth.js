import { Router } from "express";
import  authenticate  from "../middleware/auth.js";
import { certificate } from "../model/certificate.js";

const adminauth=Router();
adminauth.post('/issuecertificate', authenticate, async (req, res) => {   
    try {
        const { CertificateId, SelectCourse, CandidateName, Grade, IssueDate } = req.body;  // Correctly extract data from request

        const newCerti = new certificate({
            certiId: CertificateId,  // Match frontend key with schema field name
            selectcourse: SelectCourse,
            cani_name: CandidateName, // Fixed typo (CanidateName → CandidateName)
            grade: Grade,
            Issuedate: IssueDate
        });

        await newCerti.save();
        res.status(201).send("Certificate added");
    } catch (error) {
        console.error("Error issuing certificate:", error);
        res.status(500).send("Internal Server Error");
    }
});


adminauth.get('/viewCertificate',async(req,res)=>{
    
    try{
        const name = req.query.CertificateId;
        console.log(name);
        const result= await certificate.findOne({certiId:name})
        console.log(result);
        if(result){
            console.log("hii");
            console.log(result)
            res.status(200).json({data:result})
        }
        else{
        res.status(404).json({message:"Certificate not found"})
        }
    }
    catch(error){
        console.log(error);
        
         res.status(500).send("Internal Server Error")
     }
})

export default adminauth