import React, { useEffect, useState } from "react";
import "./style.css";
import Ratings from "../Ratings"



function ProductDetail(props) {


  const handleIncrement= (e) => {
    const id = e.target.id.split('-')[1];
    const quantity = document.getElementById(id);

    const value = parseInt(quantity.value);

    quantity.value = value + 1;
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
      {/* <select name="packaging-choices" id="packaging">
                    <option value = {props.product.packaging[0].size}>${props.product.packaging[0].price}  {props.product.packaging[0].size}</option>
                    <option value = {props.product.packaging[1].size}>${props.product.packaging[1].price}  {props.product.packaging[1].size}</option>
                  </select> */}
      <div id = "quantityDiv">
                    <button className = "inline" id={"decrementBtn-" + props.product._id} onClick={handleDecrement} >-</button>
                    <input type="text" className="inline quantity" id={props.product._id} defaultValue = "1"></input>
                    <button className = "inline" id={"incrementBtn-" + props.product._id} onClick={handleIncrement}>+</button>
                   </div>
                 <button id="addCart">ADD TO CART</button>
   </div>
   </div>
</div>
  );
}

export default ProductDetail;