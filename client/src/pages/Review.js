import React, { Fragment, useEffect, useState } from 'react';
import StarRating from 'react-star-ratings';
import {useTodoContext} from "../utils/store";
import API from "../utils/API";
import { useHistory } from "react-router-dom";
import '../App.css';
import Breadcrumb from "../components/Breadcrumbs/Breadcrumbs";
import MetaTags from "react-meta-tags";


var productName;
var prodID;

function Review() {

    const [state, dispatch] = useTodoContext();
    let history = useHistory();
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({});
    const [rating, setRating] = useState(0);
    const [id, setId] = useState("");
    const [loginInfo, setLoginInfo] = useState({_id: null, email: ""});

    /* The useEffect() scrolls to the top of the page on render.
        It then checks if the user is logged in.  If not, an alert is displayed.
        If logged in, it makes a call to load products. */
    useEffect(() => {
        window.scrollTo(0, 0);
        getName();
        if(state.loggedIn) {
        setLoginInfo({...loginInfo, email: state.email})
        var email = state.email;
        getLogin(email);
        loadProducts();
        } else {
            alert("need to be logged in to post comment");
          }
    }, []);

    // Function gets the name of the product from the URL parameter. %20's are replaced with spaces
    function getName() {
        productName = window.location.href.split("/").reverse()[1];
        const search = productName.search("%");
        if (search == -1) {
            productName = window.location.href.split("/").reverse()[1];
        } else {
            productName = productName.replace(/%20/g, ' ');
        }
    }

    // Function gets the login information of the user logged in from state
    function getLogin(){
        var loginObj = {
          password: "",
          email: state.email
        }
        API.getCommentAcct(loginObj)
          .then(res => {

             setLoginInfo({...loginInfo, email: state.email, _id: res.data._id })
          })
          .catch(err => console.log(err));
      }

    /* Function makes an API call to load the products and sets the state variable to the response.  It then calls getProduct().
      Id is taken from the url parameter and stored in state variable
    */
    function loadProducts() {
        API.getProducts()
        .then(products => {
            setId(window.location.href.split("/").pop());
            setProducts(products);
            getProduct();
        })
        .catch(err => console.log(err));
    }

    // Function filters the products state variable and sets the product in state based on the id saved in state
    function getProduct() {
        const item = products.filter(result =>
            result._id === id);
            prodID = item[0].productID;
        setProduct(item);

    }

    /* Function checks that are values are populated before submitting the rating to the appropriate product collection.  It
    then creates a new comment with the product ID and stores to the database */
    function submitReview(e) {
        e.preventDefault();

        if(!document.getElementById("reviewTitle").value || !document.getElementById("review").value || (rating == 0)) {
            alert("Please complete all fields to submit review.");
        } else {
            API.updateProduct(id , {$push: {"ratings": {"stars": rating} }} )
        .then(res=> {

         const newComment = {
            title: document.getElementById("reviewTitle").value,
            userComment: document.getElementById("review").value,
            productID: prodID
            }
            alert("Thank you! Your review has been submitted");

            API.saveComments(loginInfo._id, newComment)
            .then (res => {
                if(res.status===200) {
                    history.push(`/products/${id}`);
                  }
            })
        })
        .catch(err => console.log(err));
        }

    }

    // Handles rating updates for star rating component
    function changeRating(newRating) {
        setRating(newRating);
        setId(window.location.href.split("/").pop());
        getProduct();
        console.log(id);
    }

    /* Returns breadcrumbs, a StarRating component and the Review fields. */
    return(
        <div>
        <Fragment>
        <MetaTags>
          <title>spice-A-holic | Review</title>
          <meta
            name="Spice-A-Holic Review"
            content="Write your review."
          />
        </MetaTags>

        <div>
            {/*====================  breadcrumb area ====================*/}

            <Breadcrumb title="Review" />

            {/*====================  End of breadcrumb area  ====================*/}


            {/*====================  Start of Checkout  Section    ====================*/}
            <section>
    <div className="container">
    <div className="row justify-content-center">
    <div className="col-md-5 col-lg-4">
        <form id="form1">
        <h1 id="prdName">{productName}</h1>

            <StarRating
                rating = {rating}
                numberofStars = {5}
                changeRating = {changeRating}

            />
            <div id="inputRev">
            <p></p>
            <input id="reviewTitle" placeholder="Review Title"></input>

            <p></p>
            <textarea id ="review" placeholder="Review" ></textarea>
            </div>

            <br></br>
            <div className="container">
            <div className="project_btn text-center" id="revBtn">
            <button onClick={submitReview} className="more-link"  id="rev">Submit Review</button>
            </div>
            </div>
            </form>
    </div>
    </div>
    </div>
    </section>
    </div>
        </Fragment>
        </div>
    );

}

export default Review;