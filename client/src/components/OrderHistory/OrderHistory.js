import React, { Fragment, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import { useTodoContext} from "../../utils/store";
import {Container} from "../Grid";
import API from "../../utils/API";
import Breadcrumb from "../Breadcrumbs/Breadcrumbs";
import MetaTags from "react-meta-tags";

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

function OrderHistory() {
  
    const [orders, setOrders] = useState([]);
    const [state, dispatch] = useTodoContext();
  
    let history = useHistory();

    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,      
      maximumFractionDigits: 2,
    });
   
    useEffect(() => {
      console.log("orderHistory effect");
      if(state.loggedIn) {
        getLogin();
        getOrders();
      }
      else {
        history.push('/');
      }
    }, [])
  
    function getLogin() {
      var loginObj = {
        password: "",
        email: state.email
      }
      API.getOrdersAcct(loginObj)
        .then(res => {
        })
        .catch(err => console.log(err));
    }

    function getOrders() {

      API.getOrders(state.email)
        .then(res => {
          console.log(res.data[0]);
          console.log(res.data[0].orderIDs)
          console.log(res.data[0].orderIDs[0].creditCard);
          var orderProducts =[];
          res.data[0].orderIDs.forEach(element => {
            orderProducts.push(element);
            console.log(orderProducts);
//            acctInfo = orderProducts[0].creditCard.billingAddress.firstName;
  //          console.log(john);
          })
          acctInfo.firstName=orderProducts[0].creditCard.billingAddress.firstName;
          acctInfo.lastName=orderProducts[0].creditCard.billingAddress.lastName;
          acctInfo.street = orderProducts[0].creditCard.billingAddress.street;
          acctInfo.city = orderProducts[0].creditCard.billingAddress.city;
          acctInfo.state = orderProducts[0].creditCard.billingAddress.state;
          acctInfo.zip = orderProducts[0].creditCard.billingAddress.zip;
          acctInfo.email = orderProducts[0].email;
          acctInfo.phone = orderProducts[0].phone;
//          console.log(orderProducts[0].creditCard.billingAddress.firstName)
//          john = orderProducts[0].creditCard.billingAddress.firstName;
//          console.log(john);
          setOrders(orderProducts);
//          setOrders(orderProducts);
        })
        .catch(err => console.log(err));
//      console.log(orders);

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
          <div class="col-md-5">
            {/* <div className="container-fluid containerColor marginBottomCont"> */}
              <h1 class="mb-4">Account Info</h1>
              <table>
                <tr>{acctInfo.firstName + " " + acctInfo.lastName}</tr>
                  <tr>{acctInfo.street}</tr>
                  <tr>{acctInfo.city + "," + acctInfo.state + " " + acctInfo.zip}</tr>
                  <tr>{acctInfo.email}</tr>
                  <tr>{acctInfo.phone}</tr>
              </table>
             </div> 
             <div class="col-md-5 mt-5 mt-md-0">
              <h1 class="mb-4">Order History</h1>
              {orders.length ? (
                <div>
                  {orders.map(result => (
                    <div key={result._id}>
                        <table>
                          <thead>
                            <tr>
                              <td>Order ID</td>
                              <td>        </td>
                              <td>        </td>
                              <td>        </td>
                              <td>Order Total</td>
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
                        </table>
                        <table className="table table-curved table-responsive">
                          <thead>
                            <tr>
                              <td>Product</td>
                              <td>Size</td>
                              <td>Quantity</td>
                            </tr>
                          </thead>
                          <tbody>
                            {result.spices.map( res=> (
                            <tr>
                              <td className="align-middle text-center"><p>{res.name}</p></td>
                              <td>    </td>
                              <td className="align-middle text-center"><p>{res.size}</p></td>
                              <td>    </td>
                              <td className="align-middle text-center"><p>{res.quantity}</p></td>
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
            </div>
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