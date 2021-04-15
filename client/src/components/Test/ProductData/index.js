import React from "react";

function Products (props) {
    // set context for book search results


    return (
        <div>
            <h5>name= {props.name}</h5>
            <h5>description =  {props.description}</h5>
            <h5>healthbenefit =  {props.healthbenefit}</h5>
            <h5>picLink =  {props.picLink}</h5>
            <h5>historyDetails =  {props.historyDetails}</h5>
            <h5>family baking =  {props.family.baking}</h5>
            <h5>family grilling =  {props.family.grilling}</h5>
            <h5>family seasoning =  {props.family.seasoning}</h5>
            <h5>family extracts = {props.family.extracts}</h5>
            <h5>family teas = {props.family.teas}</h5>
            <h5>region india =  {props.region.india}</h5>
            <h5>region asia =  {props.region.asia}</h5>
            <h5>region carribean = {props.region.carribean}</h5>
            <h5>region middle east = {props.region.middleEast}</h5>
            <h5>region african = {props.region.african}</h5>
            <h5>region latinAmerica = {props.latinAmerica}</h5>
            <h5>region europe =  {props.region.europe}</h5>
            <h5>product ID =  {props.productID}</h5>
            {props.ratings.map(result => (
                <div>
                    <h5>rating stars = {result.stars}</h5>
                </div>
            ))}
            {props.packaging.map(result => (
                <div>
                <h5>packaging size=  {result.size}</h5>
                <h5>packaging price =  {result.price}</h5>
                <h5>packaging quantity =  {result.quantity}</h5>
                </div>
            ))}
        </div>
    );
}

export default Products;