import React from "react";
import Product from "../Product";

import "./style.css";

// Container to house product cards. Props are passed to a Product Component for each product result
function ProductsContainer(props) {

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

