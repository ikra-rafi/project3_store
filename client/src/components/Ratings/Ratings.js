import React, { useEffect, useState } from 'react';
import "./style.css";
import StarRating from 'react-star-ratings';

function Ratings(props) {

    const [average, setAverage] = useState(0);

    useEffect(() => {
        let isMounted = true;
        if ( props.ratings.length> 0 ) {
          if(isMounted) {
            console.log(props.ratings);
            getAverage(props.ratings);
          }

        }
      });

    function getAverage(results){
        console.log(results);
        var avg = 0;

        for (var i=0; i < results.length; i++){
            const rating = parseInt(props.ratings[i].stars);
            avg += rating;
        }
        const average = avg / props.ratings.length;

        setAverage(average);
        console.log(average);
    }

    return(
      <div>
        {/* <div className = "row">
          <div className = "col-7"> */}
            <StarRating
              rating = {average}
              numberofStars = {5}
              starDimension="15px"
              starRatedColor="#c44308"

            />
          {/* </div> */}
          {/* <div className="col-5"> */}
            <p className = "reviews">{`${props.ratings.length} Reviews`}</p>
          {/* </div> */}
        {/* </div> */}


      </div>

    );

}

export default Ratings;