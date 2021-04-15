import React from "react";

function Comments (props) {
    // set context for book search results

    return (
        <div>
            <h5>userComment= {props.userComment}</h5>
            <h5>productID =  {props.productID}</h5>
        </div>
    );
}

export default Comments;