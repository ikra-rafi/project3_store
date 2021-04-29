import React, { Fragment, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import { useTodoContext} from "../../utils/store";
import {Container} from "../Grid";
import API from "../../utils/API";
import Breadcrumb from "../Breadcrumbs/Breadcrumbs";
import MetaTags from "react-meta-tags";

// variable to hold account info for display
var acctInfo={
  firstName: "",
  lastName: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  email: "",
  phone: ""
};

// function to display account info and order history
function OrderHistory() {
  
    const [orders, setOrders] = useState([]);
    const [state, dispatch] = useTodoContext();
  
    let history = useHistory();

    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,      
      maximumFractionDigits: 2,
    });
   
    useEffect(() => {
      // check if user logged before attempting to get orders
      if(state.loggedIn) {
        // call get login to retrieve user info
        getLogin();
        // call get orders to retrieve that specific user's orders
        getOrders();
      }
      // user not logged in
      else {
        // redirect to home page since there would be no order history to retrieve
        history.push('/');
      }
    }, [])

    // function to get login info
    function getLogin() {
      var loginObj = {
        password: "",
        email: state.email
      }
      // api call to get logged in user's account info
      API.getOrdersAcct(loginObj)
        .then(res => {
        })
        .catch(err => console.log(err));
    }

    // function to get a user's orders
    function getOrders() {

      // api call to get order info
      API.getOrders(state.email)
        .then(res => {
          var orderProducts =[];
          // loop over each product for an order
          res.data[0].orderIDs.forEach(element => {
            // save each product to an array
            orderProducts.push(element);
          })
          // save account info found in first billing address section
          acctInfo.firstName=orderProducts[0].creditCard.billingAddress.firstName;
          acctInfo.lastName=orderProducts[0].creditCard.billingAddress.lastName;
          acctInfo.street = orderProducts[0].creditCard.billingAddress.street;
          acctInfo.city = orderProducts[0].creditCard.billingAddress.city;
          acctInfo.state = orderProducts[0].creditCard.billingAddress.state;
          acctInfo.zip = orderProducts[0].creditCard.billingAddress.zip;
          acctInfo.email = orderProducts[0].email;
          acctInfo.phone = orderProducts[0].phone;
          // set state for the orders
          setOrders(orderProducts);
        })
        .catch(err => console.log(err));
    }
  
    return (
      <Fragment>
      <MetaTags>
        <title>spice-A-holic | Review</title>
        <meta
          name="Spice-A-Holic Review"
          content="Write your review."
        />
      </MetaTags>
  
      <div>
          {/*====================  breadcrumb area ====================*/}
  
          <Breadcrumb title="Account Info" />
          
          {/*====================  End of breadcrumb area  ====================*/} 
  
  
          {/*====================  Start of Checkout  Section    ====================*/}        
<section className="py-5">
      <div className="container">
        <Container fluid>
          <Container>
          <div class="row">
                  <div className="container-fluid containerColor marginBottomCont">
                    <h1 class="mb-4">Account Info</h1>
                    <table>
                      <tr>{acctInfo.firstName + " " + acctInfo.lastName}</tr>
                        <tr>{acctInfo.street}</tr>
                        <tr>{acctInfo.city + "," + acctInfo.state + " " + acctInfo.zip}</tr>
                        <tr>{acctInfo.email}</tr>
                        <tr>{acctInfo.phone}</tr>
                    </table>
                  </div> 
             <br></br>
             <section className="ml-md-0">
              <h4 class="mb-4">Order History</h4>
              {orders.length ? (
                <div>
                  {orders.map(result => (
                    
                          <div className="table-responsive text-center" key={result._id}>
                              <table className="table table-bordered">
                                <thead>
                                  <tr>
                                    <td className="ptitle">Order ID</td>
                                    <td>        </td>
                                    <td>        </td>
                                    <td>        </td>
                                    <td className="ptitle">Order Total</td>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>{result._id}</td>
                                    <td>           </td>
                                    <td>         </td>
                                    <td>         </td>
                                    <td>{result.orderTotal}</td>
                                  </tr>
                                </tbody>
                              </table >
                              <table className="table-responsive text-left">
                                <thead>
                                  <tr>
                                    <td className="ptitle">Product</td>
                                    <td className="ptitle">Size</td>
                                    <td className="ptitle">Quantity</td>
                                  </tr>
                                </thead>
                                <tbody>
                                  {result.spices.map( res=> (
                                  <tr>
                                    <td className="align-middle text-left"><p>{res.name}</p></td>
                                    <td>    </td>
                                    <td className="align-middle text-left"><p>{res.size}</p></td>
                                    <td>    </td>
                                    <td className="align-middle text-left"><p>{res.quantity}</p></td>
                                  </tr>
                                  ))}
                                </tbody>
                              </table>
                          </div>
                  ))}
                  </div>
                ) : (
                          <div className="row text-center h-100">
                            <div className="col-md-12 text-center my-auto">
                              <h3 class="mb-4"><strong>No Order History for this Shopper.</strong></h3>
                            </div>
                          </div>
                )}
            </section>
            </div>
          </Container>
        </Container>
      </div>
      </section>

      </div>

      </Fragment>
    );
}

export default OrderHistory;