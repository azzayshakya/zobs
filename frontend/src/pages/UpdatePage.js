    import React,{useEffect, useState} from "react";
    import {} from "../Css/UpdatePage.css"
    import { Link } from "react-router-dom";
    import { useNavigate } from "react-router-dom";

    import { UseSelector, useSelector } from "react-redux";
import Navbar from "../component/Navbar";


    const UpdatePage = () => {
        const Navigate=useNavigate();


        const [showPopup, setShowPopup] = useState(false);
        const [SubmitButton,setSubmitButton]=useState(true);


    const products = useSelector(state => state.allProducts.products);
    // console.log(products)
      

    const [updatedJob, setUpdatedJob] = useState({
        _id: products._id,
        companyName: products.companyName || "",
        jobTitle: products.jobTitle || "",
        minPrice: products.minPrice || "",
        maxPrice: products.maxPrice || "",
        salaryType: products.salaryType || "",
        jobLocation: products.jobLocation || "",
        postingDate: products.postingDate || "",
        experienceLevel: products.experienceLevel || "",
        employmentType: products.employmentType || "",
        companyLogo: products.companyLogo || "",
        description: products.description || ""
    });
    
        
        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setUpdatedJob(prevState => ({
                ...prevState,
                [name]: value
            }));
        };

        const handleRadioChange = (event) => {
            setUpdatedJob({ ...updatedJob, [event.target.name]: event.target.value });
        };
    

        const handleSubmit = async (e) => {
            setSubmitButton(false)
        setShowPopup(true)
            e.preventDefault();
            try {
                const response = await fetch("https://zobs-major-project.onrender.com/updateJob", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({updatedJob,email:localStorage.getItem('userEmail')})
                });
                const data = await response.json();
                console.log("updated job ", data);
                if(data.success){
                    setShowPopup(false)
                    setSubmitButton(true)
                    Navigate("/")
                }
                else{
                    setShowPopup(false)
                    setSubmitButton(true)
                }
            } catch (error) {
                console.error(error);
            }
        };
        
    
        return (<>
        <div className="UpdateJobPage">

        <div>
            <Navbar/>
        </div>

            

            
                <div className="upperPostJob">
        <div className='PostJobMain'>
            <div className="PostRow">
                <div>
                <p>Company Name</p>
                    <input type="text" placeholder='companyName' name='companyName' value={updatedJob.companyName} onChange={handleInputChange}/>
                </div>
                <div>
                    <p> Job Title</p>
                    <input type="text" placeholder='jobTitle' name='jobTitle' value={updatedJob.jobTitle} onChange={handleInputChange} />
                </div>
            </div>
            <div className="PostRow">
                <div>
                    <p>Min Price in $</p>                   
                    <input type="number" placeholder='minPrice'name='minPrice' value={updatedJob.minPrice} onChange={handleInputChange}/>
                </div>
                <div>
                    <p> Max Price in $</p>   
                    <input type="number" placeholder='jobTitle' name='maxPrice' value={updatedJob.maxPrice} onChange={handleInputChange}/>
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
                    checked={updatedJob.salaryType === "Yearly"}
                    onChange={handleRadioChange}
                />
                <label htmlFor="html">Yearly</label><br />
            
                <input
                    type="radio"
                    id="Monthly"
                    name="salaryType"
                    value="Monthly"
                    checked={updatedJob.salaryType === "Monthly"}
                    onChange={handleRadioChange}
                />
                <label htmlFor="css">Monthly</label>

                </div>

            </div>

                <div className='jobLocationRow'>
                    <p>Job Location</p>   
                    <input type="text" placeholder='jobTitle' name='jobLocation' value={updatedJob.jobLocation} onChange={handleInputChange}/>
                </div>
            </div>

            <div className="PostRowRadioUpper">
                <div className='jobLocationRow'>
                    <p>Posting Date</p>                  
                    <input type="date" placeholder='Posting Date' name='postingDate' value={updatedJob.postingDate} onChange={handleInputChange}/>
                </div>
                <div>
                    <p>Experience Level</p>

                    <div className='PostRowRadio'> 
                        <input
                            type="radio"
                            id="Fresher"
                            name="experienceLevel"
                            value="Fresher"
                            checked={updatedJob.experienceLevel === "Fresher"}
                            onChange={handleRadioChange}
                            />
                            <label htmlFor="html">Fresher</label><br />

                            <input
                            type="radio"
                            id="Internship"
                            name="experienceLevel"
                            value="Internship"
                            checked={updatedJob.experienceLevel === "Internship"}
                            onChange={handleRadioChange}
                            />
                            <label htmlFor="css">Internship</label><br />

                            <input
                            type="radio"
                            id="WorkedForaCompany"
                            name="experienceLevel"
                            value="WorkedForaCompany"
                            checked={updatedJob.experienceLevel === "Worked For a Company"}
                            onChange={handleRadioChange}
                            />
                            <label htmlFor="javascript">Worked For A Company</label>
                    </div>
                    
                </div>
            </div>
            <div className="PostRow">
                <div>
                    <p>EmploymentType</p>   
                                  
                    <input type="text" placeholder='EmploymentType' name='employmentType' value={updatedJob.employmentType} onChange={handleInputChange} />
                </div>
                <div>
                    <p>Company Logo</p>   
                    <input type='text' placeholder='give us the src of the Company logo' name='companyLogo' value={updatedJob.companyLogo} onChange={handleInputChange}/> 
                </div>
            </div>

            <div className="descriptionPostJov">
                <p>Description (Max-20 Words)</p>
                <textarea name="description" id="" cols="70" rows="8" placeholder='Description' value={updatedJob.description} onChange={handleInputChange} ></textarea>
            </div>


            {showPopup &&
                    <div className="SingingUpLoading">
                    <h2 style={{marginLeft:"37%"}}>Please Wait !</h2>
                    <div className="SignUpLoader"></div>
                </div>
                }
                {SubmitButton &&
                    <div className="SubmitButton" onClick={handleSubmit}>
                    <button>Submit</button>
                </div>
                }

            
            
        </div>

        
        </div>
        </div>

                
        </>);
    }
    
    export default UpdatePage;