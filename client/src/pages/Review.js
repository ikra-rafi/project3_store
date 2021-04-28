import React, { useEffect, useState } from 'react';
import StarRating from 'react-star-ratings';
import '../App.css';


function Review() {

    const [rating, setRating] = useState();


    // Handles rating updates for star rating component
    function changeRating(newRating) {
        console.log(newRating);
        setRating(newRating);
    }


    return(

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
            <input className="input-rev" placeholder="Review Title" style={{backgroundcolor: "red"}}></input>
            </div>

            <br></br>

            <div id="revBtn">
            <button id="rev">Submit Review</button>
            </div>   
        </form>


    );

}

export default Review;