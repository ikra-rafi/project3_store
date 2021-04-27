import React, { useEffect, useState } from "react";
import "./style.css";
import Ratings from "../Ratings"



function ProductDetail(props) {

  console.log(props.packaging);
  const [amount, setAmount] = useState(2);

  const handleIncrement= (e) => {
    const id = e.target.id.split('-')[1];
    const quantity = document.getElementById(id);

    const value = parseInt(quantity.value);

    quantity.value = value + 1;
    const val = value + 1;
    setAmount(parseInt(val));
    console.log(amount);
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

    const val = value - 1;
    setAmount(parseInt(val));
    console.log(amount);
  }

  const addToCart = () => {
    console.log("add to cart");
  }

  return (
   <div className="container py-5">
    <div className="row">
    <div className="col-lg-6 col-xm-12">
     <img className="product-image" alt={props.product.name} src={props.product.picLink} />
    </div>
    <div className="col-lg-6 col-xm-12">
     <Ratings ratings= {props.ratings}/>
     <h1 id="h1" style={{color:'black'}}>{props.product.name}</h1>
      <p id="des">{props.product.description}</p>
      <p id="des">{props.product.historyDetails}</p>
      <p id="des">{props.product.healthbenefit}</p>

      <select name="packaging-choices" id="packaging">
      {props.packaging.map ( packaging =>
         <option value = {packaging.size}>${packaging.price}  {packaging.size}</option>
      )}

      </select>

      <div id = "quantityDiv">
        <button className = "inline" id={"decrementBtn-" + props.product._id} onClick={handleDecrement} >-</button>
        <input type="text" className="inline quantity" id={props.product._id} defaultValue = "1"></input>
        <button className = "inline" id={"incrementBtn-" + props.product._id} onClick={handleIncrement}>+</button>
        <button id="addCart" onClick={addToCart}>ADD TO CART</button>
      </div>
   </div>
   </div>
</div>
  );
}

export default ProductDetail;