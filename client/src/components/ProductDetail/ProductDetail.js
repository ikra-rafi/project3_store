import React, { useEffect, useState } from "react";
import "./style.css";
import Ratings from "../Ratings";
import API from "../../utils/API";

function ProductDetail(props) {

  // const [amount, setAmount] = useState(2);
  const [item, setItem] = useState({});
  useEffect (() => {
    const btn = document.getElementById("addCartBtn");

    btn.addEventListener('change', function(e){
      const pkgs = document.getElementById("packaging").value;
      console.log("select changed");

      const quantity = document.getElementById(props.product._id);

      const value = parseInt(quantity.value);

      setItem({
        name: props.product.name,
        productID: props.product.productID,
        prodInfo: {
          size: pkgs.split("-")[0],
          price: pkgs.split("-")[1],
          quantity: value
        }
      })

    })
  })

  function fireEvent(element,event){
    if (document.createEventObject){
    // dispatch for IE
    var evt = document.createEventObject();
    return element.fireEvent('on'+event,evt)
    }
    else{
    // dispatch for firefox + others
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent(event, true, true ); // event type,bubbling,cancelable
    return !element.dispatchEvent(evt);
    }
  }
  const handleIncrement= (e) => {
    const id = e.target.id.split('-')[1];
    const quantity = document.getElementById(id);

    const value = parseInt(quantity.value);

    quantity.value = value + 1;
    const val = value + 1;
    // setAmount(parseInt(val));
    // console.log(amount);
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
    // setAmount(parseInt(val));
    // console.log(amount);
  }

  const addToCart = () => {
    const sel = document.getElementById("packaging");
    console.log(sel.value);
    if(sel.value != "Null"){
      console.log("add to cart");
    // console.log(props.product);
    const pkgs = document.getElementById("packaging").value;
    // console.log(pkgs.split("-")[0]);

    const quantity = document.getElementById(props.product._id);

    const value = parseInt(quantity.value);

    API.getCart()
    .then(
      setItem({
        name: props.product.name,
        productID: props.product.productID,
        prodInfo: {
          size: pkgs.split("-")[0],
          price: pkgs.split("-")[1],
          quantity: value
        }
      })
    )
    .then(
      API.saveCart(item)
      .then(res=> {
        console.log(res.data);
        console.log(item);

        const cartItems = res.data;

      })
      )
    .catch(err => console.log(err));

    alert("Your item has been added to the shopping cart!")
    } else {
      alert("Please select a packaging size.")
    }


  }

  const selectSize = () => {
    console.log("select size");
    const pkgs = document.getElementById("packaging").value;
    // console.log(pkgs.split("-")[0]);

    const quantity = document.getElementById(props.product._id);

    const value = parseInt(quantity.value);

    setItem({
      name: props.product.name,
      productID: props.product.productID,
      prodInfo: {
        size: pkgs.split("-")[0],
        price: pkgs.split("-")[1],
        quantity: value
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
     <Ratings ratings= {props.ratings}/>
     <h1 id="h1" style={{color:'black'}}>{props.product.name}</h1>
      <p id="des">{props.product.description}</p>
      <p id="des">{props.product.historyDetails}</p>
      <p id="des">{props.product.healthbenefit}</p>

      <select onChange={selectSize} name="packaging-choices" id="packaging">
      <option  value = "Null">---Select Size---</option>
      {props.packaging.map ( packaging =>
         <option value = {`${packaging.size}-${packaging.price}`}>${packaging.price}  {packaging.size}</option>
      )}

      </select>

      <div id = "quantityDiv">
        <button className = "inline" id={"decrementBtn-" + props.product._id} onClick={handleDecrement} >-</button>
        <input type="text" className="inline quantity" id={props.product._id} defaultValue = "1"></input>
        <button className = "inline" id={"incrementBtn-" + props.product._id} onClick={handleIncrement}>+</button>
        <button id="addCartBtn" onClick={addToCart}>ADD TO CART</button>
      </div>
   </div>
   </div>
</div>
  );
}

export default ProductDetail;