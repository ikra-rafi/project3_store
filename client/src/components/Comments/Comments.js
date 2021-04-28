import React, { useEffect, useState } from 'react';
import API from "../../utils/API";
import {useTodoContext} from "../../utils/store";
import "./style.css";

function Comments(props) {
    console.log(props);
    const [state, dispatch] = useTodoContext();
    console.log(state);

    const writeReview = () => {
        const id = window.location.href.split("/").pop();
        console.log(id);
        window.location=`#/review/${id}`
    }

    return(
        <div>
            <button id="comBtn"onClick={writeReview}>Write Review</button>
            {props.product.map(res => (
                console.log(res),
                <div className="comment" key = {res._id}>
                    <h3>{res.title}</h3>
                    <p>{res.userComment}</p>

                </div>
            ))}

        </div>
    );

}

export default Comments;