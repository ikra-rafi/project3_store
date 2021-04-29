import React, { useEffect, useState } from 'react';
import "./style.css";
import StarRating from 'react-star-ratings';

function Ratings(props) {

    const [average, setAverage] = useState(0);

    // When rendered, getAverage() is called when the component has been rendered fully
    useEffect(() => {
        let isMounted = true;
        if ( props.ratings.length> 0 ) {
          if(isMounted) {
            getAverage(props.ratings);
          }

        }
      });

    // getAverage calculates the average ratings. It sets the value in state
    function getAverage(results){
        var avg = 0;

        for (var i=0; i < results.length; i++){
            const rating = parseInt(props.ratings[i].stars);
            avg += rating;
        }
        const average = avg / props.ratings.length;

        setAverage(average);
    }

    // Returns the StarRating component with the average being passed in as the value
    return(
      <div>
            <StarRating
              rating = {average}
              numberofStars = {5}
              starDimension="15px"
              starRatedColor="#c44308"

            />
            <p className = "reviews">{`${props.ratings.length} Reviews`}</p>
      </div>
    );
}

export default Ratings;