import React from "react";

function Project (props) {
    // set context for book search results

    return (
        <div>
             <h5>Spice name= {props.name}</h5>
            <h5>productID =  {props.productID}</h5>
            <h5>size = {props.prodInfo.size}</h5>
            <h5>price = {props.prodInfo.price}</h5>
            <h5>quantity = {props.prodInfo.quantity}</h5>



                </div>

    );
}

export default Project;