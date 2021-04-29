import React, { useEffect, useState } from "react";
import "./style.css";
import Ratings from "../Ratings";
import API from "../../utils/API";
// import Comments from "../Comments";
import { Link } from "react-router-dom";
import { useTodoContext } from "../../utils/store";

function ProductDetail(props) {

  // const [amount, setAmount] = useState();
  const [item, setItem] = useState({});
  const [state, dispatch] = useTodoContext();

  const handleIncrement= (e) => {
    const id = e.target.id.split('-')[1];
    const quantity = document.getElementById(id);

    const value = parseInt(quantity.value);

    quantity.value = value + 1;

    quantityChange();
  }

  const handleDecrement= (e) => {
    const id = e.target.id.split('-')[1];
    const quantity = document.getElementById(id);

    const value = parseInt(quantity.value);

    if(value > 0) {
      quantity.value = value - 1;
    } else {
      quantity.value = 0;
    }

    quantityChange();
  }

  const addToCart = () => {
    const sel = document.getElementById("packaging");
    console.log(sel.value);
    if(sel.value === "Null"){
      alert("Please select a packaging size.")
    } else {
      console.log("add to cart");
      // console.log(props.product);
      const pkgs = document.getElementById("packaging").value;
      // console.log(pkgs.split("-")[0]);
      const quantity = document.getElementById(props.product._id);

      const val = parseInt(quantity.value);
      console.log(val);


      API.getCart()
      .then( res => {
        setItem({
          name: props.product.name,
          productID: props.product.productID,
          prodInfo: {
            size: pkgs.split("-")[0],
            price: pkgs.split("-")[1],
            quantity: val
          }
        })
        dispatch({
          type: "numCartItems",
          numItems: res.data.length
        })
      })
      .then(
        API.saveCart(item)
        .then(res=> {

          console.log(res.data);
          console.log(item);

        })
        )
      .catch(err => console.log(err));

      alert("Your item has been added to the shopping cart!")
    }



  }

  const selectSize = () => {
    console.log("select size");
    const pkgs = document.getElementById("packaging").value;

    const quantity = document.getElementById(props.product._id);

    const val = parseInt(quantity.value);

    setItem({
      name: props.product.name,
      productID: props.product.productID,
      prodInfo: {
        size: pkgs.split("-")[0],
        price: pkgs.split("-")[1],
        quantity: val
      }
    })
    console.log(item);
  }

  const quantityChange = () => {
    console.log("quantityChange");
    const pkgs = document.getElementById("packaging").value;

    const quantity = document.getElementById(props.product._id);

    const val = parseInt(quantity.value);

    setItem({
      name: props.product.name,
      productID: props.product.productID,
      prodInfo: {
        size: pkgs.split("-")[0],
        price: pkgs.split("-")[1],
        quantity: val
      }
    })
    console.log(item);
  }

  return (

   <div className="container py-5">
    <div className="row">
    <div className="col-lg-6 col-xm-12">
     <img className="product-image" alt={props.product.name} src={props.product.picLink} />
    </div>
    <div className="col-lg-6 col-xm-12">

     <h1 id="h1" style={{color:'black'}}>{props.product.name}</h1>
     <Ratings ratings= {props.ratings}/>
      <p id="des">{props.product.description}</p>
      <p id="des">{props.product.historyDetails}</p>
      <p id="des">{props.product.healthbenefit}</p>

      <select onChange={selectSize} className="packaging-choices" id="packaging">
      <option  value = "Null">---Select Size---</option>
      {props.packaging.map ( packaging =>
         <option value = {`${packaging.size}-${packaging.price}`}>${packaging.price}  {packaging.size}</option>
      )}

      </select>

      <div id = "quantityDiv">
        <button className = "inline" id={"decrementBtn-" + props.product._id} onClick={handleDecrement} >-</button>
        <input type="text" onChange={quantityChange} className="inline quantity" id={props.product._id} defaultValue = "1"></input>
        <button className = "inline" id={"incrementBtn-" + props.product._id} onClick={handleIncrement}>+</button>

      </div>
      <button id="addCartBtn" onClick={addToCart}>ADD TO CART</button>
      {/* <Link className="pro-checkout"
                            to="/checkout" >
                              Checkout
                            </Link> */}
      {/* <Comments comments={props.writeReview}/> */}
   </div>



   </div>
</div>

  );
}

export default ProductDetail;