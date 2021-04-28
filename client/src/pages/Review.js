import React, { useEffect, useState } from 'react';
import StarRating from 'react-star-ratings';
import {useTodoContext} from "../utils/store";
import API from "../utils/API";

var name;

function Review() {

    const [state, dispatch] = useTodoContext();
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({});
    const [rating, setRating] = useState();
    const [id, setId] = useState("");

    // When the component mounts, a call will be made to get load products.
    useEffect(() => {
        name = window.location.href.split("/").pop();
        loadProducts();
    }, []);

    function loadProducts() {
        API.getProducts()
        .then(products => {
            const location = window.location.href.split("/");
            console.log(location);
            const itemLength = location.length;

            console.log(itemLength);
            setId(window.location.href.split("/").pop());
            setProducts(products);
            console.log(window.location.href.split("/"));

            console.log(id);
            getProduct();
        })
        .catch(err => console.log(err));
    }

    function getProduct() {
        const item = products.filter(result =>
            result._id === id);
        console.log(item);
        setProduct(item);

    }

    function submitReview() {
        console.log("submitReview");
        console.log(id);
        console.log(product);
        console.log(rating);

        API.updateProduct(id , {$push: {"ratings": {"stars": rating} }} )
        .then(res=> {
            console.log(res.data);
        })
        .catch(err => console.log(err));
        // window.location=`#/thankyou`
    }

    // Handles rating updates for star rating component
    function changeRating(newRating) {
        console.log(newRating);
        setRating(newRating);
        setId(window.location.href.split("/").pop());
        getProduct();
        console.log(id);
    }

    return(
        <div>
            <h1>{name}</h1>
            <form>
                <p>Rating</p>
                <StarRating
                    rating = {rating}
                    numberofStars = {5}
                    changeRating = {changeRating}
                />
                <p>Review Title</p>
                <input></input>
                <p>Review</p>
                <input></input>
                <button onClick={submitReview}>Submit Review</button>
            </form>
        </div>
    );

}

export default Review;