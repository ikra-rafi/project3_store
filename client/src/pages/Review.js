import React, { useEffect, useState } from 'react';
import StarRating from 'react-star-ratings';
import {useTodoContext} from "../utils/store";
import API from "../utils/API";
import { Redirect, useHistory } from "react-router-dom";

var productName;
var prodID;
// var newComment = {};

function Review() {

    const [state, dispatch] = useTodoContext();
    let history = useHistory();
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({});
    const [rating, setRating] = useState();
    const [id, setId] = useState("");
    const [loginInfo, setLoginInfo] = useState({_id: null, email: ""});

    // When the component mounts, a call will be made to get load products.
    useEffect(() => {
        getName();
        // if(state.loggedIn) {
        setLoginInfo({...loginInfo, email: state.email})
        var email = state.email;
        getLogin(email);
        loadProducts();
        // } else {
        //     alert("need to be logged in to post comment");
        //   }
    }, []);

    function getName() {
        productName = window.location.href.split("/").reverse()[1];
        const search = productName.search("%");
        if (search == -1) {
            productName = window.location.href.split("/").reverse()[1];
        } else {
            productName = productName.replace(/%20/g, ' ');
        }
    }

    function getLogin(){
        var loginObj = {
          password: "",
          email: state.email
        }
        API.getCommentAcct(loginObj)
          .then(res => {

             setLoginInfo({...loginInfo, email: state.email, _id: res.data._id })
            console.log(res.data)
          })
          .catch(err => console.log(err));
      }

    function loadProducts() {
        API.getProducts()
        .then(products => {
            setId(window.location.href.split("/").pop());
            setProducts(products);

            getProduct();
        })
        .catch(err => console.log(err));
    }

    function getProduct() {
        const item = products.filter(result =>
            result._id === id);
            prodID = item[0].productID;
        setProduct(item);

    }

    function submitReview() {
        console.log("submitReview");

        API.updateProduct(id , {$push: {"ratings": {"stars": rating} }} )
        .then(res=> {
            console.log(res.data.productID);
            console.log("Saved rating");

         const newComment = {
            title: document.getElementById("reviewTitle").value,
            userComment: document.getElementById("review").value,
            productID: prodID
            }
            console.log(newComment);

            API.saveComments(loginInfo._id, newComment)
            .then (res => {
                if(res.status===200) {
                    console.log("Saved Comment");
                    // history.push(`/products/${id}`);
                  }
            })
        })
        .catch(err => console.log(err));

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
            <h1>{productName}</h1>
            <form>
                <p>Rating</p>
                <StarRating
                    rating = {rating}
                    numberofStars = {5}
                    changeRating = {changeRating}
                />
                <p>Review Title</p>
                <input id = "reviewTitle"></input>
                <p>Review</p>
                <input id = "review"></input>
                <button onClick={submitReview}>Submit Review</button>
            </form>
        </div>
    );

}

export default Review;