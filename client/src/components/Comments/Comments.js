import React, {useEffect} from 'react';
import {useTodoContext} from "../../utils/store";
import "./style.css";
import $ from "jquery";

function Comments(props) {

    const [state, dispatch] = useTodoContext();

    // If user is not logged in, hide Write Review button
    useEffect(() => {
        if(!state.loggedIn) {
            $("#comBtn").addClass("hideSelf");
        }
    }, []);

    // Sets id of the product based on URL parameter and opens Review page for that item
    const writeReview = () => {
        const name = props.name;
        const id = window.location.href.split("/").pop();
        console.log(id);
        window.location=`#/review/${name}/${id}`
    }

    // Returns a Write Review button and list of Reviews associated with the product
    return(
        <div className="container">
            <div className="project_btn text-center">
            <button id="comBtn"onClick={writeReview}>Write Review</button>
            <div><h2 style={{fontWeight:'bold', textDecoration:'underline'}}>Reviews</h2></div>
            {props.product.map(res => (
                console.log(res),
                <div className="comment" key = {res._id}>
                    <h3>{res.title}</h3>
                    <p>{res.userComment}</p>
                    <p>{new Date(res.date).toLocaleDateString()}</p>

                </div>


            ))}
</div>
        </div>
    );

}

export default Comments;