import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import {} from "../Css/applicants.css";

const JobApplicants = () => {
    const [jobsData, setJobsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {

        try {
            setLoading(true);
            const fetchedData = await fetch("https://zobs-major-project.onrender.com/applicants", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: localStorage.getItem("userEmail") })
            });
            const response = await fetchedData.json();
            const responsedata= await response.data.reverse();
            setJobsData(responsedata);
            
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Error fetching data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleOpenFile = (fileUrl) => {
        // Open the file in a new tab/window
        fetch(fileUrl)
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const fileName = fileUrl.split('/').pop(); // Extract filename from URL
                const pdfFileName = fileName.endsWith('.pdf') ? fileName : fileName + '.pdf'; // Ensure filename has .pdf extension
                const a = document.createElement('a');
                a.href = url;
                a.download = pdfFileName; // Specify the filename with ".pdf" extension
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            })
            .catch(error => {
                console.error('Error downloading file:', error);
            });
    };

    return (
        <div className="applicantpagemain">
            <Navbar />
            {loading ? (
                <div className="DataLoading">
                    <h2>Data is loading !</h2>
                    <div className="loader"></div>
                </div>
            ) : (
                <div>
                    {error ? (
                        <h2>{error}</h2>
                    ) : (
                        <div>
                            {jobsData && jobsData.length > 0 ? (
                                <div>
                                    {jobsData.map((job) => (
                                        <div className="mainc" key={job._id}>
                                            <div className="maintop">
                                                <h3>Job Title: <span style={{}}>{job.jobtitle}</span></h3>
                                                <p>Job ID:<span> {job.jobid}</span></p>
                                                <p>Your Email:<span> {job.jobemail}</span></p>
                                                <h4>Applicants:</h4>
                                            </div>
                                            <ul>
                                                {job.applicant.map((applicant, index) => (
                                                    <li key={index}>
                                                        <div className="mainbottom">
                                                            <p>Name: <span>{applicant.name}</span></p>
                                                            <p>Email: <span>{applicant.email}</span></p>
                                                            <p>Number: <span>{applicant.number}</span></p>
                                                            <p>Skills: <span>{applicant.skills}</span></p>
                                                            <p>Resume: <button className="resumebutton" onClick={() => handleOpenFile(applicant.file)}>Open</button></p>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                            <hr />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="DataLoading">
                                <h2 style={{padding:"50px 0px"}}>No applicants found !</h2>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default JobApplicants;
