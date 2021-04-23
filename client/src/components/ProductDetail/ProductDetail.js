import React, { useContext } from "react";
import "./style.css";
import Ratings from "../Ratings"

function ProductDetail(props) {
  console.log(props)

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
   <div>

     <h1 style={{color:'black'}}>{props.product.name}</h1>
     <img className="product-image" alt={props.product.name} src={props.product.picLink} />

     {/* <Ratings ratings= {props.product.ratings}/> */}
      <p>{props.product.description}</p>
      <p>{props.product.historyDetails}</p>
      <p>{props.product.healthbenefit}</p>
      {/* <select name="packaging-choices" id="packaging">
                    <option value = {props.product.packaging[0].size}>${props.product.packaging[0].price}  {props.product.packaging[0].size}</option>
                    <option value = {props.product.packaging[1].size}>${props.product.packaging[1].price}  {props.product.packaging[1].size}</option>
                  </select> */}
      <div id = "quantityDiv">
                    <button className = "inline" id={"decrementBtn-" + props.product._id} onClick={handleDecrement} >-</button>
                    <input type="text" className="inline quantity" id={props.product._id} defaultValue = "1"></input>
                    <button className = "inline" id={"incrementBtn-" + props.product._id} onClick={handleIncrement}>+</button>
                    <button>Add to Cart</button>
                  </div>
   </div>

  );
}

export default ProductDetail;