import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { FiCalendar, FiClock, FiDollarSign, FiMapPin } from 'react-icons/fi';
import '../Css/Card.css'; 
// import { Navigate } from 'react-router-dom';


const Card = ({ data }) => {   

    // console.log("alljobs:   ",data)

    const [showPopup, setShowPopup] = useState(false);
    const [ApplyButton,setApplyButton]=useState(true);


    const [popup , setPopup]=useState(false);
    const togglePopup = () => {
        setPopup(!popup);
    }
    const jobid=data._id;
    const jobtitle=data.jobTitle;
    const jobemail=data.email;
    


    const [credentials,setcredentials]=useState({name:"",email:"",number:"",file:null,skills:"",experienceLevel:"",experienceinyears:""})

    
    const handleFormSubmit=async(event)=>{  
        // console.log(credentials)      
        setApplyButton(false)
        setShowPopup(true)
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', credentials.name);
            formData.append('email', credentials.email);
            formData.append('number', credentials.number);
            formData.append('file', credentials.file);
            formData.append('skills', credentials.skills);
            formData.append('experienceLevel', credentials.experienceLevel);
            formData.append('experienceinyears', credentials.experienceinyears);
    
            formData.append('jobid', jobid);
            formData.append('jobtitle', jobtitle);
            formData.append('jobemail', jobemail);
    
            const apply = await fetch("https://zobs-major-project.onrender.com/createPost", {
                method: "POST",
                // headers: {
                //     'Content-Type': 'multipart/form-data', // Set the content type to handle file uploads
                //   },
                body: formData
            });
            const json = await apply.json();
            console.log(json)
            if(json.success){
                setShowPopup(false)
                setApplyButton(true)
                Navigate("/")
                alert("providing wrong informaintion")

            }
            if(!json.success){
                setShowPopup(false)
                setApplyButton(true)
                alert("providing wrong informaintion")
            }
    }

        catch(error){
            console.log("card.js page error  " ,  error)
        }







        
    }
    const handleInputChange=(event)=>{
        setcredentials({...credentials,[event.target.name]:event.target.value})
    }
    const handleRadioChange = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value });
    };

    const handleFileChange=(e)=>{
        setcredentials({...credentials,file:e.target.files[0]})
    }


    const {
        companyName,
        jobTitle,
        companyLogo,
        minPrice,
        maxPrice,
        salaryType,
        jobLocation,
        postingDate,
        experienceLevel,
        employmentType,
        description
    } = data;

    return (<>


    
            <div className="card">
                <Link className='ppp' to={"/"}>
                    <div className="CardImg">
                        <img src={companyLogo} alt="" />
                    </div>

                    <div className="rightPartOfCard">
                        <div className='CardTitleAndName'>
                            <h4 className='companuName'>{companyName}</h4>
                            <h3>{jobTitle}</h3>
                        </div>

                        <div className='MidRowOfTheCard'>
                            <span className="spanofcard"><FiMapPin />{jobLocation}</span>
                            <span className="spanofcard"><FiClock />{employmentType}</span>
                            <span className="spanofcard"><FiDollarSign />{minPrice}-{maxPrice}</span>
                            <span className="spanofcard"><FiCalendar />{postingDate}</span>
                        </div>
                        <p>
                            {description}
                        </p>
                    </div>
                    <div className="applybutton">
                        <Link to={"/"}>
                        <button onClick={togglePopup}>Apply</button>
                        </Link>
                       
                    </div>

                    
                </Link>
                
            </div>
         
            

            <div>
                {
                    popup ? 
                    (
                        <div className='applyForm'>
                            <div className='applyforminner'>

                                <div className="row">
                                    <div className='leftelementincardform'>
                                        <label>name</label>
                                        <input type="text" name="name" placeholder="Full Name" value={credentials.name} onChange={handleInputChange} />

                                    </div>
                                    <div className="rightelementincardform">
                                        <label>Email</label>
                                        <input type="email" name="email" placeholder="Email" value={credentials.email} onChange={handleInputChange} />

                                    </div>
                                </div>
                                <div className="row">
                                    <div className='leftelementincardform'>
                                        <label>number</label>
                                        <input type="number" name="number" placeholder="number"  value={credentials.number} onChange={handleInputChange} />

                                    </div>
                                    <div className="rightelementincardform">
                                        <label>file</label>
                                        <input type="file" name="file" placeholder="file"  onChange={handleFileChange} />
                                    </div>

                                </div>

                                <div className="row rowexp">
                                <div className='radioincardform'>

                                    
                                <div className='applyformradio'> 
                                    <p> Experience Level :</p>
                                    <label htmlFor="Fresher">
                                        <input
                                            type="radio"
                                            id="Fresher"
                                            name="experienceLevel"
                                            value="Fresher"
                                            checked={credentials.experienceLevel === "Fresher"}
                                            onChange={handleRadioChange}
                                        />
                                        Fresher
                                    </label><br />
                            
                                    <label htmlFor="Internship">
                                        <input
                                            type="radio"
                                            id="Internship"
                                            name="experienceLevel"
                                            value="Internship"
                                            checked={credentials.experienceLevel === "Internship"}
                                            onChange={handleRadioChange}
                                        />
                                        Internship
                                    </label><br />
                            
                                    <label htmlFor="WorkedForaCompany">
                                        <input
                                            type="radio"
                                            id="WorkedForaCompany"
                                            name="experienceLevel"
                                            value="Worked For a Company"
                                            checked={credentials.experienceLevel === "Worked For a Company"}
                                            onChange={handleRadioChange}
                                        />
                                        Working 
                                    </label>
                                </div>
                            </div>

                            
                                    <div className="rightelementincardform">
                                        <label>Experience in years ( If have )</label>
                                        <input type="number" name="experienceinyears" placeholder="Experience in years" value={credentials.experienceinyears} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className='skiilsinform'>
                                        <label>skills</label>
                                        <textarea name="skills" id="" cols="40" rows="3" placeholder='skills' value={credentials.skills} onChange={handleInputChange} ></textarea>
                                    </div>
                                    
                                </div>
                            
                            <div>

                            </div>

                            {showPopup &&
                    <div className="SingingUpLoading">
                    <h2>Please Wait !</h2>
                    <div className="SignUpLoader"></div>
                </div>
                }
                {ApplyButton &&
                   <div className='submitformdatabutton'>
                   <button type="submit" className=''  onClick={handleFormSubmit}>Submit</button>


                   </div>
                }
                            
                            </div>


                        </div>

                    ):(
                        <h1></h1>
                    )
                }
            </div>


      
            </>);
}

export default Card;