import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setProduct } from "../redux/action/actions"
import { FiCalendar, FiClock, FiDollarSign, FiMapPin } from 'react-icons/fi';
import { } from '../Css/SingleCreatedJob.css'

const SingleCreatedJob = ({ job }) => {
  const dispatch = useDispatch();
  const handleDispatchJob = () => {
    dispatch(setProduct(job));
  };
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
  } = job;



  return (<>

    <div className="SingleCreatedJob">

      
        <div className="card singlecreditjobcard">

          <Link className='ppp' to={"/"}>

            <div className="CardImg">
              <img src={companyLogo} alt="" />
            </div>

            <div className="rightPartOfCard">

              <div className='CardTitleAndName'>
                <h4 className='companuName' style={{color:"red"}}>{companyName}</h4>
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

          </Link>

        </div>

        <div className="Updatebutton">

          <Link to="/UpdatePage">
            <button onClick={handleDispatchJob}> Update</button>
          </Link>

        </div>

    </div>

    


  </>);
};

export default SingleCreatedJob;