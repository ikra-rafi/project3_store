import React from "react";

function Project (props) {
    // set context for book search results

    return (
        <div>
            <h5>recipeDesc= {props.recipeDesc}</h5>
            <h5>productID =  {props.productID}</h5>
            {props.recipeIngredients.map(result => (
                <div>
                    <h5>ingredient = {result.ingredient}</h5>
                </div>
            ))}
            {props.recipeSteps.map(result => (
                <div>
                    <h5>Steps = {result.step}</h5>
                </div>
            ))}            
        </div>
    );
}

export default Project;