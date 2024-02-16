import React, { useState } from 'react';
import Navbar from '../component/Navbar'
import {} from '../Css/PostJob.css'
import { Navigate } from 'react-router-dom';
const PostJob = () => {
    const [credentials,setcredentials]= useState({ email: localStorage.getItem("userEmail"),companyName:"",jobTitle:"",minPrice:"",maxPrice:"",salaryType:"",jobLocation:"",postingDate:"",experienceLevel:"",employmentType:"",companyLogo:"",description:""})
    const HandleSubmit=async(event)=>{
        
        event.preventDefault();
        console.log(JSON.stringify(credentials))       
        const response=await fetch("https://zobs-major-project.onrender.com/PostJob",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({email:credentials.email,companyName:credentials.companyName,jobTitle:credentials.jobTitle,minPrice:credentials.minPrice,maxPrice:credentials.maxPrice,salaryType:credentials.salaryType,jobLocation:credentials.jobLocation,postingDate:credentials.postingDate,experienceLevel:credentials.experienceLevel,employmentType:credentials.employmentType,companyLogo:credentials.companyLogo,description:credentials.description})
            
            
        })
        const json= await response.json();
        console.log(json)
        if (!json.success) {
            alert("enter valid details")
        }
        if (json.success) {
            alert("Job posted successfully")
            Navigate("/")
        }

    }

    const handleNameChange=(event)=>{
        setcredentials({...credentials,[event.target.name]:event.target.value})
    }
    const handleRadioChange = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value });
    };



    return <div className='postjobpagemain'>
        <div>
            <Navbar/>
        </div>
        <div className="upperPostJob">
        <div className='PostJobMain'>
            <div className="PostRow">
                <div>
                <p>Company Name</p>
                    <input type="text" placeholder='companyName' name='companyName' value={credentials.companyName} onChange={handleNameChange}/>
                </div>
                <div>
                    <p> Job Title</p>
                    <input type="text" placeholder='jobTitle' name='jobTitle' value={credentials.jobTitle} onChange={handleNameChange} />
                </div>
            </div>
            <div className="PostRow">
                <div>
                    <p>Min Price in $</p>                   
                    <input type="number" placeholder='minPrice'name='minPrice' value={credentials.minPrice} onChange={handleNameChange}/>
                </div>
                <div>
                    <p> Max Price in $</p>   
                    <input type="number" placeholder='jobTitle' name='maxPrice' value={credentials.maxPrice} onChange={handleNameChange}/>
                </div>
            </div>
            {/* <input type="text" placeholder='company name' name='salaryType' value={credentials.salaryType} onChange={handleNameChange} /> */}


            <div className="PostRowRadioUpper">
            <div>
                <p>Salary Type</p>
                <div className="PostRowRadio">

                <input
                    type="radio"
                    id="Yearly"
                    name="salaryType"
                    value="Yearly"
                    checked={credentials.salaryType === "Yearly"}
                    onChange={handleRadioChange}
                />
                <label htmlFor="html">Yearly</label><br />
            
                <input
                    type="radio"
                    id="Monthly"
                    name="salaryType"
                    value="Monthly"
                    checked={credentials.salaryType === "Monthly"}
                    onChange={handleRadioChange}
                />
                <label htmlFor="css">Monthly</label>

                </div>

            </div>

                <div className='jobLocationRow'>
                    <p>Job Location</p>   
                    <input type="text" placeholder='jobTitle' name='jobLocation' value={credentials.jobLocation} onChange={handleNameChange}/>
                </div>
            </div>

            <div className="PostRowRadioUpper">
                <div className='jobLocationRow'>
                    <p>Posting Date</p>                  
                    <input type="date" placeholder='Posting Date' name='postingDate' value={credentials.postingDate} onChange={handleNameChange}/>
                </div>
                <div>
                    <p>Experience Level</p>

                    <div className='PostRowRadio'> 
                        <input
                            type="radio"
                            id="Fresher"
                            name="experienceLevel"
                            value="Fresher"
                            checked={credentials.experienceLevel === "Fresher"}
                            onChange={handleRadioChange}
                            />
                            <label htmlFor="Fresher">Fresher</label><br />

                            <input
                            type="radio"
                            id="Internship"
                            name="experienceLevel"
                            value="Internship"
                            checked={credentials.experienceLevel === "Internship"}
                            onChange={handleRadioChange}
                            />
                            <label htmlFor="Internship">Internship</label><br />

                            <input
                            type="radio"
                            id="WorkedForaCompany"
                            name="experienceLevel"
                            value="Worked For a Company"
                            checked={credentials.experienceLevel === "Worked For a Company"}
                            onChange={handleRadioChange}
                            />
                             
                            <label htmlFor="WorkedForaCompany">Worked For A Company</label>
                    </div>
                    
                </div>
            </div>
            <div className="PostRow">
                <div>
                    <p>EmploymentType</p>   
                                  
                    <input type="text" placeholder='EmploymentType' name='employmentType' value={credentials.employmentType} onChange={handleNameChange} />
                </div>
                <div>
                    <p>Company Logo</p>   
                    <input type='text' placeholder='give us the src of the Company logo' name='companyLogo' value={credentials.companyLogo} onChange={handleNameChange}/> 
                </div>
            </div>

            <div className="descriptionPostJov">
                <p>Description (Max-20 Words)</p>
                <textarea name="description" id="" cols="70" rows="8" placeholder='Description' value={credentials.description} onChange={handleNameChange} ></textarea>
            </div>

            <div className="SubmitButton" onClick={HandleSubmit}>
            <button>Submit</button>
        </div>
            
        </div>

        
        </div>

    </div>
}



export default PostJob;