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
            const ratings = props.ratings;
            console.log(props);
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
            {/* <div className="project_btn text-center"> */}
            <div className="project_btn">
            <button id="comBtn"onClick={writeReview}>Write Review</button>
            <h2 style={{fontWeight:'bold', textDecoration:'underline'}}>Customer Reviews</h2>
            <div>
                <div>
                    <div className="col">

                    </div>
                    <div className="col">
                        <div className="row">
                            {/* <div className="col-3">

                            </div> */}
                            <div className="col">
                                {props.product.map(res => (
                                // console.log(res),
                                    <div className="comment" key = {res._id}>
                                        <div className="row">
                                            <div className="col-10">
                                                <h3>{res.title}</h3>
                                            </div>
                                            <div className="col-2" style={{textAlign:'right'}}>
                                                <p>{new Date(res.date).toLocaleDateString()}</p>
                                            </div>
                                        </div>

                                        <p>{res.userComment}</p>

                                    </div>
                                 ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>


</div>
        </div>
    );

}

export default Comments;