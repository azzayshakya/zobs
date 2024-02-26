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
            setJobsData(response.data);
            
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
        window.open(fileUrl, '_blank');
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
                                                <h3>Job Title: {job.jobtitle}</h3>
                                                <p>Job ID: {job.jobid}</p>
                                                <p>Your Email: {job.jobemail}</p>
                                                <h4>Applicants:</h4>
                                            </div>
                                            <ul>
                                                {job.applicant.map((applicant, index) => (
                                                    <li key={index}>
                                                        <div className="mainbottom">
                                                            <p>Name: {applicant.name}</p>
                                                            <p>Email: {applicant.email}</p>
                                                            <p>Number: {applicant.number}</p>
                                                            <p>Skills: {applicant.skills}</p>
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
