import {React, useState} from 'react'
import {} from '../Css/Navbar.css'
import { FaBars } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import { GiCrossFlare } from "react-icons/gi";
import { Link, Navigate, useNavigate } from 'react-router-dom';

const Navbar=()=>{

    const [IsOpen,setIsOpen]=useState(false);
    const Navigate =useNavigate();
    
    const toggleButton=()=>{
        setIsOpen(!IsOpen);
    }
    const handleLogout=()=>{

        


        localStorage.removeItem("authToken");
        localStorage.removeItem("userEmail")


        Navigate("LogIn")
    }


    
    return (<>
    <div className='Header'>

        <div className="logoSide a">
            <div className="companyIcon active zx">
               <GiCrossFlare/>
            </div>
            <div className="companyName zx">
                ZOBS
            </div>
        </div>

       

        {(localStorage.getItem("authToken")) ?
        <div>
             <div className="navbarMid a">
            <ul>
                <li className="navbarNames active"><Link className='LinkTAG LinkTAGHome active' to={"/"}>Home</Link></li>
                <li className="navbarNames"><Link className='LinkTAG' to={"/MyCreatedJobs"}>My Jobs</Link></li>
                <li className="navbarNames"><Link className='LinkTAG' to={"/JobApplicants"}>Job Applicants</Link></li>
                <li className="navbarNames"><Link className='LinkTAG' to={"/PostAJob"}>Post A Job</Link></li>
            </ul>
        </div>

        </div>
        :
        <div>
             <div className="navbarMid a">
            <ul>
                <li className="navbarNames active"><Link className='LinkTAG LinkTAGHome active' to={"/"}>Home</Link></li>
                {/* <li className="navbarNames"><Link className='LinkTAG' to={""}>Azzay</Link></li>
                <li className="navbarNames">Azzay</li>
                <li className="navbarNames"><Link className='LinkTAG' to={""}>Azzay</Link></li> */}
            </ul>
        </div>
        
        </div>
        }

        {(localStorage.getItem("authToken")) ?
        <div className="buttonside a">
    
        <div className="loginButton">
            <button onClick={handleLogout}><Link className='LinkTag' to="/LogIn">Log Out</Link></button>
        </div>
        </div>

        :

        <div className="buttonside a">
        

        <div className="loginButton">
            <button><Link className='LinkTag' to="/LogIn">Log In</Link></button>
        </div>

        <div className="logoutButton">
            <button><Link className='LinkTag' to="/SignUp">Sign Up</Link></button>
        </div>
    </div>
        
        }

<div>
            
        </div>

        

        

        <div className="toggleButton">

            <button onClick={toggleButton}>
            {
                IsOpen ? <ImCross/>:<FaBars/>
            }
            </button>

        </div>
        </div>

        {/* for mobile */}
        {IsOpen && (
          <div className="headerMobile">
            <div className="navbarMidMobile a">
              <ul>
              <li className="navbarNames active"><Link className='LinkTAG LinkTAGHome active' to={"/"}>Home</Link></li>
                <li className="navbarNames"><Link className='LinkTAG' to={"/MyCreatedJobs"}>My Jobs</Link></li>
                <li className="navbarNames"><Link className='LinkTAG' to={"/JobApplicants"}>Job Applicants</Link></li>
                <li className="navbarNames"><Link className='LinkTAG' to={"/PostAJob"}>Post A Job</Link></li>dddddd 
              </ul>
            </div>

            <div className="buttonsideMobile a">
              <div className="loginButtonMobile">
              <button><Link className='LinkTag active' to="/LogIn">Log in</Link></button>

              </div>
              <div className="logoutButtonMobile">
              <button><Link to="/SignUp" className='LinkTag'>Sign Up</Link></button>
              </div>
            </div>
          </div>
        )}
    </>)
}
export default Navbar;