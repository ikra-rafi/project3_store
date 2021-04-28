import React, { useEffect, useState } from "react";
import API from "../utils/API";
import ProductContext from "../utils/productContext";
import ProductsContainer from "../components/ProductsContainer";
import { useTodoContext} from "../utils/store";
import { Link } from 'react-router-dom';
import MetaTags from "react-meta-tags";
import Jumbotron from '../components/Jumbotron';

function Home() {

  // declarations of state variables
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [bakingProducts, setBakingProducts] = useState([]);
  const [grillingProducts, setGrillingProducts] = useState([]);
  const [seasoningProducts, setSeasoningProducts] = useState([]);
  const [extractProducts, setExtractProducts] = useState([]);
  const [teaProducts, setTeaProducts] = useState([]);
  const [state, dispatch] = useTodoContext();

// When the component mounts, a call will be made to retrieve products.
useEffect(() => {
  loadProducts();
}, []);

// function to get products from db
function loadProducts() {
  // api call to retrieve items from products table
  API.getProducts()
    .then(products => {
      // set state
      setProducts(products);
      console.log(products);
      setProduct(products[0]);
      filterResults(products);
    })
    .catch(err => console.log(err));
  }

  // function to filter results on home page (products)
  function filterResults(products) {
    // checking each product against product family and saving to state
    const baking = products.filter(result => (result.family.baking === true));
    setBakingProducts(baking);

    const grilling = products.filter(result => (result.family.grilling === true));
    setGrillingProducts(grilling);

    const seasoning = products.filter(result => (result.family.seasoning === true));
    setSeasoningProducts(seasoning);

    const extract = products.filter(result => (result.family.extract === true));
    setExtractProducts(extract);

    const teas = products.filter(result => (result.family.teas === true));
    setTeaProducts(teas);
  }

  // getting state about whether user logged in or not
  const loggedIn = state.loggedIn;
  console.log('navbar render, props: ')
  console.log("loggedIn = " + loggedIn);

  return (
    <><MetaTags>
        <title>spice-A-holic | Home</title>
        <meta
          name="description"
          content="Organic Spices."
        />
      </MetaTags>
      <Jumbotron />

    <ProductContext.Provider value={{product, products}}>

      <div>
      <section className="product-section">
      <div className="container">
          <div className="base-header">
              <small> Our Featured Items</small>  
              <h3>Organic products</h3> 
          </div>
          
      </div>
  </section>

        <h1 className="base-header" style={{color:'black'}}>Baking</h1>
        <ProductsContainer
          products = {bakingProducts}
          family = "baking"
          page = "home"/>
        <h1 className="base-header" style={{color:'black'}}>Grilling</h1>
        <ProductsContainer
          products = {grillingProducts}
          family = "grilling"
          page = "home"/>
        <h1 className="base-header" style={{color:'black'}}>Seasoning</h1>
        <ProductsContainer
          products = {seasoningProducts}
          family = "seasoning"
          page = "home"/>
        <h1 className="base-header" style={{color:'black'}}>Extract</h1>
        <ProductsContainer
          products = {extractProducts}
          family = "extract"
          page = "home"/>
        <h1 className="base-header" className="base-header"style={{color:'black'}}>Teas</h1>
        <ProductsContainer
          products = {teaProducts}
          family = "teas"
          page = "home"/>
          <div className="container">
        <div className="project_btn text-center">
          <Link className="more-link" to={{
            pathname:"/products",
            state: {products: {products}}
          }}>View All</Link>
        </div>
        <br className="footer-spacing"></br>
        </div>
        {/* <ContactUsForm /> */}
      </div>

    </ProductContext.Provider>
    
</>
  )

}

export default Home;