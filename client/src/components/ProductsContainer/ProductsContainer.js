import React, { useContext, useState } from "react";
import ProductContext from "../../utils/productContext";
import Product from "../Product"
import "./style.css";

function ProductsContainer(props) {
  console.log(props);

  
  return (

    
    <div>
      <div className="container product-wrapper">
        {props.products.map(product => (
          <div key={product._id}>
            <Product product = {product}
                     page = {props.page} />
          </div>
        ))}

      </div>

    </div>
  );
}

export default ProductsContainer;

