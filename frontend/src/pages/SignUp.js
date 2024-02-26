import React, { useState } from "react"; 
import Navbar from "../component/Navbar";
import {} from '../Css/Login.css'
import {} from '../Css/LoadingState.css'

import { Flashlight, Lock } from 'lucide-react';
import { Mail } from 'lucide-react';
import { GiCrossFlare } from "react-icons/gi";
import { User } from 'lucide-react';
import { Contact } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const SignUp=()=>{

    const [credentials,setcredentials]=useState({name:"" ,email:"",mobileNumber:"",password:""});
    const [showPopup, setShowPopup] = useState(false);
    const [signUpButton,setsignUpButton]=useState(true);
    const Navigate= useNavigate();

    const handleSubmit=async(event)=>{
        setsignUpButton(false)
        setShowPopup(true)
        event.preventDefault();
        const response= await fetch("https://zobs-major-project.onrender.com/SignUp",{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name:credentials.name,email:credentials.email,mobileNumber:credentials.mobileNumber,password:credentials.password})
        })
        const json=await response.json();
        console.log(json)
        if(!json.success){
            setShowPopup(false)
            setsignUpButton(true)
            alert("wrong credintles")
        }
        if(json.success){

            setShowPopup(false)
            setsignUpButton(true)
            alert("signup successfully")
            Navigate("/LogIn")
            
        }
    }
    
    const handleNameChange=(event)=>{
        setcredentials({...credentials,[event.target.name]:event.target.value})
    }
    return<>
    <div className="Signuppage">
    <div>
            <Navbar/>
        </div>
        <div className="upperFormContainer">

            <div className="leftSide">
                <div className="leftsideIcon">
                    <GiCrossFlare/>
                </div>
                <div className="leftSideLogo active">
                    <p>ZOBS</p>

                </div>
                <div className="leftsideTag">
                    <p>“Your dream job awaits!”</p>

                </div>
            </div>
            <div className="rightside">

            <div style={{height:"370px"}}className="FormMainContainer SignUPFormMainContainer">

                <div>
                    <h2>SignUp</h2>
                </div>

                <div className="asdf">
                    <div className="formIcon"><User/></div>
                    <input type="name" name="name" value={credentials.name} onChange={handleNameChange} id="" placeholder="Your Name"/>
                </div>

                <div className="asdf">
                    <div className="formIcon"><Mail/></div>
                    <input type="email" name="email" value={credentials.email} onChange={handleNameChange} id="" placeholder="Your Email"/>
                </div>

                <div className="asdf">
                    <div className="formIcon"><Contact/></div>
                    <input type="Number" name="mobileNumber" value={credentials.mobileNumber} onChange={handleNameChange} id="" placeholder="Mobile Number"/>
                </div>

                <div className="asdf"> 
                <div className="formIcon"><Lock/></div>         
                    <input type="password" name="password" value={credentials.password} onChange={handleNameChange} id="" placeholder="Password"/>
                </div> 
                {showPopup &&
                    <div className="SingingUpLoading">
                    <h2>Please Wait !</h2>
                    <div className="SignUpLoader"></div>
                </div>
                }
                {signUpButton &&
                <div className="FormButton">
                    
                <button onClick={handleSubmit}>SignUp</button>
            </div>

                }

                

            </div>

            </div>

        </div>

        
    </div>
    
    </>
}
export default SignUp;