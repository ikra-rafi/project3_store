import React, { useEffect, useState } from "react";
import "./style.css";
import Ratings from "../Ratings";
import API from "../../utils/API";

function ProductDetail(props) {

  const [item, setItem] = useState({});

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
    if(sel.value === "Null"){
      alert("Please select a packaging size.")
    } else {
      const pkgs = document.getElementById("packaging").value;
      const quantity = document.getElementById(props.product._id);

      const val = parseInt(quantity.value);

      API.getCart()
      .then(
        setItem({
          name: props.product.name,
          productID: props.product.productID,
          prodInfo: {
            size: pkgs.split("-")[0],
            price: pkgs.split("-")[1],
            quantity: val
          }
        })
      )
      .then(
        API.saveCart(item)
        .then(res=> {

        })
        )
      .catch(err => console.log(err));

      alert("Your item has been added to the shopping cart!")
    }
  }

  const selectSize = () => {
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
  }

  const quantityChange = () => {
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
   </div>
   </div>
</div>

  );
}

export default ProductDetail;