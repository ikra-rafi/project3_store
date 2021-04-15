import React from "react";

function Project (props) {
    // set context for book search results

    return (
        <div>
             <h5>email= {props.email}</h5>
            <h5>password =  {props.password}</h5>
            <h5>security Question = {props.securityQuestion}</h5>
            <h5>security Answer = {props.securityAnswer}</h5>
            <h5>admin = {props.admin}</h5>
            <h5>discount = {props.discount}</h5>
        </div>

    );
}

export default Project;