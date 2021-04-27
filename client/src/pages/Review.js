import React, { useEffect, useState } from 'react';
import StarRating from 'react-star-ratings';


function Review() {

    const [rating, setRating] = useState();

    function changeRating(newRating) {
        console.log(newRating);
        setRating(newRating);
    }

    return(

        <form>
            <p>Rating</p>
            <StarRating
                rating = {rating}
                numberofStars = {5}
                changeRating = {changeRating}
            />
            <p>Review Title</p>
            <input></input>
            <p>Review</p>
            <input></input>
            <button>Submit Review</button>
        </form>


    );

}

export default Review;