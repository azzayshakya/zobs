import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import SingleCreatedJob from "../component/SingleCreatedJob";
import {useDispatch, useSelector } from "react-redux";
import {setProduct} from "../redux/action/actions"

const MyCreatedJobs = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    
            // console.log(Products)
    const dispatch=useDispatch();
        

    const getData = async () => {
        try {
            setLoading(true);
            


            const response = await fetch("https://zobs-major-project.onrender.com/MyCreatedJobs", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: localStorage.getItem("userEmail")
                })
            });
            const jsonData = await response.json();
            setData(jsonData.postedJobs);
            // dispatch(setProduct(jsonData.postedJobs))
            // console.log("jobdata",jsonData)




        } catch (error) {

            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // console.log("hey bro Products",Products)

    useEffect(() => {
        getData();
    }, []);



    return (
        <div className="myCreatedJobMain">
            <Navbar />
            <div>
                {loading ? (
                    <div className="DataLoading">
                    <h2>Data is loading !</h2>
                    <div class="loader"></div>
                    </div>
                ) : (
                    <div>
                        {data && data.length > 0 ? (
                            <div className="beforesinglecreditedjon">
                                {data.map((job, index) => (
                                    <div key={job._id}>
                                       
                                        <SingleCreatedJob job={job} />   
                
                                                                                                                 
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="DataLoading">
                                <h2 style={{padding:"50px 0px"}}>You have not created any Jobs</h2>
                                </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyCreatedJobs;
