import React from 'react';
import "./style.css";
import Ratings from "../Ratings";
import { Link } from "react-router-dom";

function Product(props) {

  console.log(props);
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

  if (props.page === "home"){
    return (
      <div className="row">
          <div className="col-4">
            <div className="card" id="ls">
              <div className="img-container"id="cont" >
                <Link className="nav-link" to={{pathname: `/products/${props.product._id}`, props: {props}}} ><img className="product-image"  alt={props.product.name} src={props.product.picLink} /></Link>
              </div>
              <div className="content">

                  <h3 className="product-name">
                   {props.product.name}
                  </h3>
                  
                      <p >${props.product.packaging[0].price}</p>
                      <p >{props.product.packaging[0].size}</p>
                   

                    
                      <button id="addCart">Add to Cart</button>
                    
                  </div>
              </div>
            </div>
          </div>
   
    );

  } else {
    return (
      <div className="row">
          <div className="col-4">
            <div className="card" id="ls">
              <div className="img-container" id="image">
              <Link className="nav-link" to={{pathname: `/products/${props.product._id}`, props: {props}}} ><img className="product-image" alt={props.product.name} src={props.product.picLink} /></Link>
              </div>
              <div className="content">

                  <h3 className="product-name" id="h5">
                   {props.product.name}
                  </h3>
                  <Ratings id="rate" ratings= {props.product.ratings}/>
                  <p id="description">{props.product.description}</p>

                  <select name="packaging-choices" id="packaging">
                    <option value = {props.product.packaging[0].size}>${props.product.packaging[0].price}  {props.product.packaging[0].size}</option>
                    <option value = {props.product.packaging[1].size}>${props.product.packaging[1].price}  {props.product.packaging[1].size}</option>
                  </select>
                  
                    
                  <div id = "quantityDiv">
                
                  
                    <button className = "inline btn" id={"decrementBtn-" + props.product._id} onClick={handleDecrement} >-</button>
                    <input  type="text" className="inline quantity btn" id={props.product._id} defaultValue = "1"></input>
                    <button className = "inline btn" id={"incrementBtn-" + props.product._id} onClick={handleIncrement}>+</button>
                
                  
                    <button id="addCart1">Add to Cart</button>  
                  </div>
                  </div>
                  </div>
                  

                  </div>
</div>
            
          
    
    );

  }

}

export default Product;