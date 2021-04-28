import React, { Fragment, useEffect, useState } from "react";
import API from "../utils/API";
import ProductContext from "../utils/productContext";
import ProductsContainer from "../components/ProductsContainer";
import MetaTags from "react-meta-tags";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumbs";

function AllProducts() {

  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

// When the component mounts, a call will be made to get load products.
useEffect(() => {
  loadProducts();
}, []);

function loadProducts() {
  API.getProducts()
    .then(products => {
      setProducts(products);
      setFilteredProducts(products);
      console.log(products);
      setProduct(products[0]);
    })
    .catch(err => console.log(err));
}

function handleInputChange(event)  {
  const search = event.target.value;
  console.log(search);
  const filteredResults = products.filter(result =>
    result.name.toLowerCase().includes(search.toLowerCase())
  );
  console.log(filteredResults);
  setFilteredProducts(filteredResults);
}

function filterResults(event) {
  const filter = event.target.value;
  if (filter === "baking"){
    const baking = products.filter(result => (result.family.baking === true));
    setFilteredProducts(baking);
  } else if (filter === "grilling"){
    const grilling = products.filter(result => (result.family.grilling === true));
    setFilteredProducts(grilling);
  } else if (filter === "seasoning"){
    const seasoning = products.filter(result => (result.family.seasoning === true));
    setFilteredProducts(seasoning);
  } else if (filter === "extract"){
    const extract = products.filter(result => (result.family.extract === true));
    setFilteredProducts(extract);
  } else if (filter === "teas"){
    const teas = products.filter(result => (result.family.teas === true));
    setFilteredProducts(teas);
  } else {
    setFilteredProducts(products);
  }

}

  return (
    <Fragment>
      <MetaTags>
        <title>spice-A-holic | All Products</title>
        <meta
          name="description"
          content="Organic spices."
        />
      </MetaTags>

     <div className="contact-page">

       {/*====================  breadcrumb area ====================*/}

       <Breadcrumb title="Product Details" />
    <><section className="product-section">
      <div className="container">
          <div className="base-header">
              <small> Our Featured Items</small>  
              <h3>Organic products</h3> 
          </div>
          
      </div>
  </section>
    <ProductContext.Provider value={{product, products}}>
    <div className="container">
    <div className="row justify-content-center">
      <div className="col-md-5 col-lg-4">      
      <form>
          <label style={{color:'black'}}>Search Products: </label><input id="searchInput" onKeyUp={handleInputChange} ></input>
      </form>

      <select name="filter" id="filterDropdown" onChange= {filterResults}>
        <option value = "">Select a family...</option>
        <option value = "baking">Baking</option>
        <option value = "grilling">Grilling</option>
        <option value = "seasoning">Seasoning</option>
        <option value = "extract">Extract</option>
        <option value = "teas">Teas</option>
      </select>
      <div>
        <ProductsContainer products = {filteredProducts}/>
      </div>
      </div></div></div>
    </ProductContext.Provider>
</>
</div>
</Fragment>
  );
}

export default AllProducts;