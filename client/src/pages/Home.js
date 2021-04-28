import React, { useEffect, useState } from "react";
import API from "../utils/API";
import ProductContext from "../utils/productContext";
//import ContactUsForm from "../components/ContactUsForm.js";
import ProductsContainer from "../components/ProductsContainer";
import { useTodoContext} from "../utils/store";
import { Link } from 'react-router-dom';
import MetaTags from "react-meta-tags";
import Jumbotron from '../components/Jumbotron';




function Home() {

  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [bakingProducts, setBakingProducts] = useState([]);
  const [grillingProducts, setGrillingProducts] = useState([]);
  const [seasoningProducts, setSeasoningProducts] = useState([]);
  const [extractProducts, setExtractProducts] = useState([]);
  const [teaProducts, setTeaProducts] = useState([]);
  const [state, dispatch] = useTodoContext();
//  const [logout, setLogout] = useState();

// When the component mounts, a call will be made to get random users.
useEffect(() => {
  loadProducts();
}, []);

function loadProducts() {
  API.getProducts()
    .then(products => {
      setProducts(products);
      console.log(products);
      setProduct(products[0]);
      filterResults(products);
    })
    .catch(err => console.log(err));
  }

  function filterResults(products) {
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

  // function handleLogout() {
  //   API.Logout('/logout')
  //     .then(response => {
  //       console.log('Get user response: ')
  //       console.log(response.data)
  //       if (response.data.user) {
  //         console.log('Get User: There is a user saved in the server session: ')

  //         dispatch({
  //           type: "loggedIn",
  //           loggedIn: true,
  //           email: response.data.user.email
  //       })
  //     } else {
  //       console.log('Get user: no user');
  //       dispatch({
  //         type: "loggedIn",
  //         loggedIn: false,
  //         email: null
  //       })

  //     }
  //   })
  // }

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
{/* MERN */}
    {/* <div>
      <header className="navbar App-header" id="nav-container">
          <div className="col-4" >
              {loggedIn ? (
                  <section className="navbar-section">
                      <Link to="#" className="btn btn-link text-secondary" onClick={handleLogout}>
                      <span className="text-secondary">logout</span></Link>

                  </section>
              ) : (
                      <section className="navbar-section">
                          <Link to="/" className="btn btn-link text-secondary">
                              <span className="text-secondary">home</span>
                              </Link>
                          <Link to="/login" className="btn btn-link text-secondary">
                          <span className="text-secondary">login</span></Link>
                          <Link to="/signup" className="btn btn-link">
                          <span className="text-secondary">sign up</span></Link>
                      </section>
                  )}
          </div>
          <div className="col-4 col-mr-auto">
          <div id="top-filler"></div> */}
              {/* <img alt="logo" /> */}
              {/* <h1>MERN Passport</h1>
          </div>
      </header>
    </div> */}
{/* Mern */}

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