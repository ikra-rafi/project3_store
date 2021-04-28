import React, { useEffect, useState } from 'react';
import StarRating from 'react-star-ratings';
import {useTodoContext} from "../utils/store";
import API from "../utils/API";
import { Redirect, useHistory } from "react-router-dom";
import '../App.css';

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

    function submitReview(e) {
        e.preventDefault();
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
            alert("Thank you! Your review has been submitted");

            API.saveComments(loginInfo._id, newComment)
            .then (res => {
                if(res.status===200) {
                    console.log("Saved Comment");
                    history.push(`/products/${id}`);
                    // document.location=`#/products/${id}`
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
        showButton();
    }

    function showButton() {
        if(document.getElementById("reviewTitle").value.length > 0 && document.getElementById("review").value > 0 && rating != 0) {
            document.getElementById("rev").removeAttribute("class", "hideSelf");
        }
    }

    return(
        <div>

            <form id="form1">
            <h1>{productName}</h1>
            <StarRating
                rating = {rating}
                numberofStars = {5}
                changeRating = {changeRating}
                // starDimension="30px"
            />
            <div id="inputRev">
            <p></p>
            <input id="reviewTitle" placeholder="Review Title" onChange={showButton}></input>

            <p></p>
            <textArea id ="review" onChange={showButton} placeholder="Review " ></textArea>
            </div>

            <br></br>

            <div id="revBtn">
            <button onClick={submitReview} id="rev" className="hideSelf">Submit Review</button>
            </div>
        </form>

        </div>

    );

}

export default Review;