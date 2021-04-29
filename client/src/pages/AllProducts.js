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
  window.scrollTo(0, 0);
  loadProducts();
}, []);

function loadProducts() {
  API.getProducts()
    .then(products => {
      setProducts(products);
      setFilteredProducts(products);
      setProduct(products[0]);
    })
    .catch(err => console.log(err));
}

function handleInputChange(event)  {
  const search = event.target.value;
  const filteredResults = products.filter(result =>
    result.name.toLowerCase().includes(search.toLowerCase())
  );
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

function filterResults2(event) {
  const filter = event.target.value;
  if (filter === "india"){
    const india = products.filter(result => (result.region.india === true));
    setFilteredProducts(india);
  } else if (filter === "asia"){
    const asia = products.filter(result => (result.region.asia === true));
    setFilteredProducts(asia);
  } else if (filter === "carribean"){
    const caribbean = products.filter(result => (result.region.caribbean === true));
    setFilteredProducts(caribbean);
  } else if (filter === "middleEast"){
    const middleEast = products.filter(result => (result.region.middleEast === true));
    setFilteredProducts(middleEast);
  } else if (filter === "african"){
    const african = products.filter(result => (result.region.african === true));
    setFilteredProducts(african);
  } else if (filter === "latinAmerica"){
    const latinAmerica = products.filter(result => (result.region.latinAmerica === true));
    setFilteredProducts(latinAmerica);
  } else if (filter === "europe"){
    const europe = products.filter(result => (result.region.europe === true));
    setFilteredProducts(europe);
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
      <form id="filters">

          <label style={{color:'black'}}>Search Products: </label><input id="searchInput" style={{margin:'2px'}} onKeyUp={handleInputChange} ></input>


      <select className="custom-select d-block w-100" style={{margin:'2px'}} name="filter" id="filterDropdown" onChange= {filterResults}>
        <option value = "">Select a family...</option>
        <option value = "baking">Baking</option>
        <option value = "grilling">Grilling</option>
        <option value = "seasoning">Seasoning</option>
        <option value = "extracts">Extract</option>
        <option value = "teas">Teas</option>
      </select>

      <select class="custom-select d-block w-100" name="filter2" id="filterDropdown2" style={{margin:'2px'}} onChange= {filterResults2}>
        <option value = "">Select a region...</option>
        <option value = "india">India</option>
        <option value = "asia">Asia</option>
        <option value = "carribean">Caribbean</option>
        <option value = "middleEast">Middle East</option>
        <option value = "african">African</option>
        <option value = "latinAmerica">Europe</option>
      </select>

      </form>
      <div></div></div>
      </div>
        <ProductsContainer products = {filteredProducts}/>
      </div>

    </ProductContext.Provider>
</>
</div>
</Fragment>
  );
}

export default AllProducts;