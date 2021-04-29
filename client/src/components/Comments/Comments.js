import React from 'react';
import "./style.css";

function Comments(props) {

    // function to write a review of product
    const writeReview = () => {
        const name = props.name;
        const id = window.location.href.split("/").pop();
        console.log(id);
        window.location=`#/review/${name}/${id}`
    }

    return(
        <div className="container">
            <div className="project_btn text-center">
            <button id="comBtn"onClick={writeReview}>Write Review</button>
            {props.product.map(res => (
                console.log(res),
                <div className="comment" key = {res._id}>
                    <h3>{res.title}</h3>
                    <p>{res.userComment}</p>

                </div> 
              
                
            ))}
</div>
        </div>
    );

}

export default Comments;