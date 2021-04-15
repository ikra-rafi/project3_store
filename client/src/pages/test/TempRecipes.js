import React, { useEffect, useState} from "react";
import API from "../../utils/API";

import RecipeData from "../../components/Test/RecipeData"
import {Row, Container} from "../../components/Test/Grid";

function TempRecipes () {
    // set up state for saved books and a trigger
    const [recipes, setRecipes]= useState([]);
    const [trigger, setTrigger] = useState("1");

    const storeRecipes = [
    {   recipeDesc: "Lasagna",
        recipeIngredients: [
          { ingredient: "noodles"},
          { ingredient: "sauce"},
          { ingredient: "oregano"},
          { ingredient: "garlic"},
          { ingredient: "hamburger meat"},
          { ingredient: "cheese"}
        ],
        recipeSteps: [
          { step: "1. Brown hamburger meat."},
          { step: "2. Cook noodles per package instructions."},
          { step: "3. Simmer sauce, garlice and oregano until heated."},
          { step: "4. Combine meat and sauce."},
          { step: "5. Spread layer of sauce in pan."},
          { step: "6. Top with noodles."},
          { step: "7. Add cheese."},
          { step: "8. Add more sauce."},
          { step: "9. Repeat for more layers."},
          { step: "10. Bake for 1 hr at 350deg."}
        ],
        productID: "LASAGNA0001"
    },
    {
      recipeDesc: "cake",
      recipeIngredients: [
        { ingredient: "cake mix"},
        { ingredient: "2 eggs" },
        { ingredient: "oil"},
        { ingredient: "water"}
      ],
      recipeSteps: [
        { step: "1. Combine eggs, cake mix, water, oil in bowl"},
        { step: "2. Beat until smooth and no lumps."},
        { step: "3. Pour batter into greased pan."},
        { step: "4. Bake for 35min at 350deg."},
      ],
      productID: "CAKE00012"    
    }];

    // Load all saved books and store them with setBooks
    // useEffect(() => {
    //     console.log("in useEffect orders");
    //     saveOrders(storeOrders);
    //   })
    useEffect(() => {
        console.log("recipes Effect");
        getRecipes();
    }, [])

    // function to retrieve the saved books from database
    // function loadSavedBooks() {
    //     API.getBooks()
    //       .then(res => {
    //         // set state to returned list of saved books
    //         setSavedBooks(res.data)
    //       })
    //     .catch(err => console.log(err));
    // };


    function saveRecipes(storeRecipes) {
        console.log("inside recipes");
        console.log(storeRecipes);
        API.saveRecipes(storeRecipes)
        .then(res => API.getRecipes()
                        .then(res=> { console.log("recipes"); console.log(res.data); recipes =res.data})
                        .catch(err => console.log(err))
            
            )
        .catch(err => console.log(err));
    }

    function handleRecipeBtnClick(event) {
        API.saveRecipes(storeRecipes)
            .then(res => {
                console.log("recipes");
                console.log(res.data);
                setRecipes(res.data);
            })
            .catch(err => console.log(err));
    }

    function getRecipes() {
        API.getRecipes()
        .then(res=> {
            console.log("recipes = " + res.data);
            setRecipes(res.data);
        })
        .catch(err => console.log(err))
    }

    // return the rendered saved books page
    return (
            <Container fluid>
                <button className="btn myButton buttonMargin" style={{ fontSize: "20px"}} onClick={handleRecipeBtnClick}><strong>Recipes</strong></button>
                <Row>
                <div className="container-fluid containerColor marginBottomCont">
                    {recipes.length ? (
                        <div>
                            {recipes.map(result => (
                                <div key={result._id}>
                                    <RecipeData
                                        id = {result._id}
                                        recipeDesc = {result.recipeDesc}
                                        recipeIngredients = {result.recipeIngredients}
                                        recipeSteps = {result.recipeSteps}
                                        productID = {result.productID}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="row text-center h-100">
                            <div className="col-md-12 text-center my-auto">
                                <h3><strong>No Saved Recipes</strong></h3>
                            </div>
                        </div>
                    )}
                </div>
                </Row>
            </Container>
        )
}

export default TempRecipes;