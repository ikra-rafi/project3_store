import React, { Fragment, useEffect, useState } from 'react';
import StarRating from 'react-star-ratings';
import '../App.css';
import Breadcrumb from "../components/Breadcrumbs/Breadcrumbs";
import MetaTags from "react-meta-tags";

function Review() {

    const [rating, setRating] = useState();


    // Handles rating updates for star rating component
    function changeRating(newRating) {
        console.log(newRating);
        setRating(newRating);
    }


    return(

        <Fragment>
        <MetaTags>
          <title>spice-A-holic | Review</title>
          <meta
            name="Spice-A-Holic Review"
            content="Write your review."
          />
        </MetaTags>
    
        <div>
            {/*====================  breadcrumb area ====================*/}
    
            <Breadcrumb title="Review" />
            
            {/*====================  End of breadcrumb area  ====================*/} 
    
    
            {/*====================  Start of Checkout  Section    ====================*/}        
    <section>
    <div className="container">
    <div className="row justify-content-center">
    <div className="col-md-5 col-lg-4">
        <form id="form1">
            {/* <p>Rating</p> */}
            <StarRating
                rating = {rating}
                numberofStars = {5}
                changeRating = {changeRating}
                // starDimension="30px"
            />
            <div id="inputRev"> 
            <p></p>
            <input  placeholder="Review Title"></input>
            
            <p></p>
            <input  placeholder="Review " ></input>
            </div>

            <br></br>
            <div className="container">
            <div className="project_btn text-center" id="revBtn">
            <button className="more-link"  id="rev">Submit Review</button>
            </div>   </div>
        </form>
    </div>
    </div>
    </div>
    </section>
    </div>
    </Fragment>
    );

}

export default Review;