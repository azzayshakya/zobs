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
            


            const response = await fetch("http://localhost:5000/MyCreatedJobs", {
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
                            <div>
                                {data.map((job, index) => (
                                    <div key={job._id}>
                                       
                                        <SingleCreatedJob job={job} />   
                
                                                                                                                 
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <h2>No jobs found</h2>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyCreatedJobs;
