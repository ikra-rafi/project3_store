import React, {useEffect} from 'react';
import "./style.css";
import $ from "jquery";

function Comments(props) {

    useEffect(() => {

        if(!state.loggedIn) {
            $("#comBtn").addClass("hideSelf");
        }
    }, []);

    const writeReview = () => {
        const name = props.name;
        const id = window.location.href.split("/").pop();
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