import React, {useState} from "react";
import ContactUsForm from "../components/ContactUsForm.js";
import Container from "../components/Container";
import ProductsTable from "../components/ProductsTable";
import API from "../utils/API";
import { useTodoContext} from "../utils/store";
import { Route, Link } from 'react-router-dom';

function Home() {

  const [state, dispatch] = useTodoContext();
  const [logout, setLogout] = useState();


  function handleLogout() {
    API.Logout('/logout')
      .then(response => {
        console.log('Get user response: ')
        console.log(response.data)
        if (response.data.user) {
          console.log('Get User: There is a user saved in the server session: ')

          dispatch({
            type: "loggedIn",
            loggedIn: true,
            email: response.data.user.email
        })
      } else {
        console.log('Get user: no user');
        dispatch({
          type: "loggedIn",
          loggedIn: false,
          email: null
        })

      }
    })
  }

  const loggedIn = state.loggedIn;
  console.log('navbar render, props: ')
  console.log("loggedIn = " + loggedIn);
  
  return (
      <div>

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
                              <span className="text-secondary">login</span>
  </Link>
                              <Link to="/signup" className="btn btn-link">
                              <span className="text-secondary">sign up</span>
  </Link>
                          </section>
                      )}
              </div>
              <div className="col-4 col-mr-auto">
              <div id="top-filler"></div>
                  <img alt="logo" />
                  <h1>MERN Passport</h1>
              </div>
          </header>
      </div>

  );

}


export default Home;