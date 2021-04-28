import React, { Fragment, useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import Cart from "../components/Cart";
import CartData from "../components/Test/CartData"
import {Container} from "../components/Grid";
import API from "../utils/API";
import { useTodoContext} from "../utils/store";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumbs";
import MetaTags from "react-meta-tags";

function Checkout() {
  let shipCompanyName = React.createRef();
  let shipFirstName = React.createRef();
  let shipLastName = React.createRef();
  let shipStreet = React.createRef();
  let shipAddress2 = React.createRef();
  let shipCity = React.createRef();
  let shipState = React.createRef();
  let shipZip = React.createRef();
  let billCompanyName = React.createRef();
  let billFirstName = React.createRef();
  let billLastName = React.createRef();
  let billStreet = React.createRef();
  let billAddress2 = React.createRef();
  let billCity = React.createRef();
  let billState = React.createRef();
  let billZip = React.createRef();
  let ccName = React.createRef();
  let ccNumber = React.createRef();
  let ccType = React.createRef();
  let ccSecurityCode = React.createRef();
  let ccExpDate = React.createRef();
  let email = React.createRef();
  let phone = React.createRef();
  let notes = React.createRef();

  const [state, dispatch] = useTodoContext();
 // const [cart, setCart] = useState();
 let history = useHistory();
  const [checkbox, setCheckbox] = useState();
  const [changePage, setChangePage] = useState({redirectTo: null});
  const [loginInfo, setLoginInfo] = useState({_id: 0, email: ""}); 

  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,      
    maximumFractionDigits: 2,
  });

//var billingCheck=false;
  function handleCheck(e) {
 //   billingCheck = e.target.checked;
    setCheckbox(e.target.checked);
  }

  useEffect(() => {
    if(state.loggedIn) {
      getLogin();
    }
    console.log("cart Effect");
    getCart();
    console.log("checkout");

  }, [])

  function getLogin(){
    var loginObj = {
      password: "",
      email: state.email
    }
    API.getOrdersAcct(loginObj)
      .then(res => {
        if(state.loggedIn) {
            setLoginInfo({...loginInfo, email: state.email, _id: res.data._id})
            console.log(res.data)
        } else if (!state.loggedIn)
        {
            setLoginInfo({...loginInfo, email: "", _id: 0})
        }
      })
      .catch(err => console.log(err));
  }

  function handleSubmitBtnClick(e) {
    e.preventDefault();
    const orderInfo = 
    {
      orderNum: "BL0001",
      shippingAddress: {
        companyName: shipCompanyName.current.value,
        firstName: shipFirstName.current.value,
        lastName: shipLastName.current.value,
        street: shipStreet.current.value,
        address2: shipAddress2.current.value,
        city: shipCity.current.value,
        state: shipState.current.value,
        zip: shipZip.current.value
      },
      email: email.current.value,
      phone: phone.current.value,
      creditCard: {
        billingAddress: {
          companyName: checkbox ? (shipCompanyName.current.value) : (billCompanyName.current.value),
          firstName: checkbox ? (shipFirstName.current.value) : (billFirstName.current.value),
          lastName: checkbox ? (shipLastName.current.value) : (billLastName.current.value),
          street: checkbox ? (shipStreet.current.value) : (billStreet.current.value),
          address2: checkbox ? (shipAddress2.current.value) : (billAddress2.current.value),
          city: checkbox ? (shipCity.current.value) : (billCity.current.value),
          state: checkbox ? (shipState.current.value) : (billState.current.value),
          zip: checkbox ? (shipZip.current.value) : (billZip.current.value),
        },
        cardInfo: {
          cardNumber: ccNumber.current.value,
          cardType: ccType.current.value,
          securityCode: ccSecurityCode.current.value,
          cardName: ccName.current.value,
          expirationDate: ccExpDate.current.value
        }
      },
      spices: [],
      notes: notes.current.value,
      orderTotal: state.orderTotal
    }

    for(let i=0; i<state.cartItems.length; i++) {
      const tempspices = 
      {
       name: "garlic",
       size: "4oz bottle",
       price: "4.99",
       quantity: 2
      }
      tempspices.name = state.cartItems[i].name;
      tempspices.size = state.cartItems[i].prodInfo.size;
      tempspices.quantity = state.cartItems[i].prodInfo.quantity;
      tempspices.price = state.cartItems[i].prodInfo.price;

      orderInfo.spices[i] = tempspices;
    }

    API.saveOrders(loginInfo._id, state.loggedIn, orderInfo)
      .then(res => {
        if(res.status === 200) {
          console.log("success on order save");
          API.deleteCart()
            .then(result => {
              if(res.status===200) {
                console.log("deleted cart");
                history.push("/ThankYou");
              }
            })
        }
        console.log("in save orders");
        console.log(res.data);
        console.log(res.data._id);
      }) 
      .catch(err => console.log(err));
  }

  function getCart() {
    var salesTaxCalc;
    var newSubTotal;
    if(state.loggedIn) {
       salesTaxCalc = ((parseFloat(state.subTotal) - parseFloat(state.discountTotal)) * parseFloat(state.salesTax)/100);
       newSubTotal = ((parseFloat(state.subTotal) - parseFloat(state.discountTotal)));
    }
    else {
      salesTaxCalc = (parseFloat(state.subTotal)) * parseFloat(state.salesTax)/100;
      newSubTotal = (parseFloat(state.subTotal));
    }

    dispatch({
      type: "orderTotal",
      orderTotal: ((newSubTotal + parseFloat(salesTaxCalc) + parseInt(state.shipFee))),
    })
  }

  return (
    <Fragment>
    <MetaTags>
      <title>spice-A-holic | Check Out</title>
      <meta
        name="Spice-A-Holic Checkout"
        content="Proceed to place your order."
      />
    </MetaTags>


    <div className="checkout-page">
        {/*====================  breadcrumb area ====================*/}

        <Breadcrumb title="Check Out" />
        
        {/*====================  End of breadcrumb area  ====================*/} 


        {/*====================  Start of Checkout  Section    ====================*/}    
    <section className="checkout_section">
      <div className="container">
      <Container fluid>
        <Container >
        <Cart />
              <div className="row">

              <div className="container-fluid containerColor marginBottomCont">
               <h1 className="text-center">Checkout Page</h1> 
               <h1 className="text-center">Cart Total = ${formatter.format(state.orderTotal)}</h1>
               {state.cartItems.length ? (
                  <div>
                    <div className="row">
                    <div id="content" className="col-md-8 order-md-1">
                    <div className="contactform" method="post" className="shopform">
                    <div className="custom-title">
                     <h3>Shipping details</h3>
                    </div>
                      <br/>
                    <form id={1} className="searchForm justify-content-center m-2" key={1}>
                      
                      <div class="row">
                
                          <label className="label" htmlFor="exampleInputEmail1">Company Name</label>
                          <input name="shipCompanyName" ref={shipCompanyName} id="shipCompanyName" className="form-control form-control-lg" placeholder="Ship Company Name" />
     
                          <label className="label" htmlFor="exampleInputEmail1">First Name</label>
                          <input name="shipFirstName" ref={shipFirstName} id="shipFirstName" className="form-control form-control-lg" placeholder="Ship First Name" />
                          
                          <div className="mb-3">
                          <label className="label" htmlFor="exampleInputEmail1">Last Name</label>
                          <input name="shipLastName" ref={shipLastName} id="shipLastName" className="form-control form-control-lg" placeholder="Ship Last Name" />
                          </div>

                          <div className="mb-3">
                          <label className="label" htmlFor="exampleInputEmail1">Address</label>
                          <input type="text"name="shipStreet" ref={shipStreet} id="shipStreet" className="form-control form-control-lg" placeholder="Shipping Street" />
                          </div>

                          <div className="mb-3">
                          <label className="label" htmlFor="exampleInputEmail1">Address #2</label>
                          <input  type="text" name="shipAddress2" ref={shipAddress2} id="shipAddress2" className="form-control form-control-lg" placeholder="Shipping Address #2" />
                          </div> 
                      </div>

                          <label className="label" htmlFor="exampleInputEmail1">City</label>
                          <input name="shipCity" ref={shipCity} id="shipCity" className="form-control form-control-lg" placeholder="Shipping City" />

                          <label className="label" htmlFor="exampleInputEmail1">State</label>
                      
                            <div className="select">
                              <select class="custom-select d-block w-100" ref={shipState} id="shipState" defaultValue="" required="">
                                <option value="" disabled="">Choose...</option>
                                <option value="AK">AK</option>
                                <option value="AL">AL</option>
                                <option value="AR">AR</option>
                                <option value="AZ">AZ</option>
                                <option value="CA">CA</option>
                                <option value="CO">CO</option>
                                <option value="CT">CT</option>
                                <option value="DC">DC</option>
                                <option value="DE">DE</option>
                                <option value="FL">FL</option>
                                <option value="GA">GA</option>
                                <option value="HI">HI</option>
                                <option value="IA">IA</option>
                                <option value="ID">ID</option>
                                <option value="IL">IL</option>
                                <option value="IN">IN</option>
                                <option value="KS">KS</option>
                                <option value="KY">KY</option>
                                <option value="LA">LA</option>
                                <option value="MA">MA</option>
                                <option value="MD">MD</option>
                                <option value="ME">ME</option>
                                <option value="MI">MI</option>
                                <option value="MN">MN</option>
                                <option value="MO">MO</option>
                                <option value="MS">MS</option>
                                <option value="MT">MT</option>
                                <option value="NC">NC</option>
                                <option value="ND">ND</option>
                                <option value="NE">NE</option>
                                <option value="NH">NH</option>
                                <option value="NJ">NJ</option>
                                <option value="NM">NM</option>
                                <option value="NV">NV</option>
                                <option value="NY">NY</option>
                                <option value="OH">OH</option>
                                <option value="OK">OK</option>
                                <option value="OR">OR</option>
                                <option value="PA">PA</option>
                                <option value="RI">RI</option>
                                <option value="SC">SC</option>
                                <option value="SD">SD</option>
                                <option value="TN">TN</option>
                                <option value="TX">TX</option>
                                <option value="UT">UT</option>
                                <option value="VA">VA</option>
                                <option value="VT">VT</option>
                                <option value="WA">WA</option>
                                <option value="WI">WI</option>
                                <option value="WV">WV</option>
                                <option value="WY">WY</option>
                              </select>
                            </div>

                    <div className="mb-3">
                          <label className="label" htmlFor="exampleInputEmail1">Zip</label>
                          <input name="shipZip" ref={shipZip} id="shipZip" className="form-control form-control-lg" type="text" placeholder="Shipping Zip Code" maxLength="5"
                            size="5" required/>
                    </div>

                    <div className="mb-3">
                          <label className="label" htmlFor="exampleInputEmail1">Email</label>                      
                          <input type="email" ref={email} id="email" name="email" className="form-control form-control-lg" placeholder="email" />
                    </div>
                    <div className="mb-3">
                      <label className="label" htmlFor="exampleInputEmail1">Phone</label>
                      <input type="tel" ref={phone} id="phone" name="phone" className="form-control form-control-lg" placeholder="555-555-5555"
                          maxLength="12" size="12" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required/>
                      <label className="label" htmlFor="exampleInputEmail1">Notes</label>                      
                      <input name="notes" ref={notes} id="notes" className="form-control form-control-lg" placeholder="notes" />
                      </div>
                    </form>

                    <div className="row">
                    <div style={{display: "inline-block"}}>
                    <label className="label" htmlFor="billingAddr">Billing address same as Shipping address</label>
                    <input type="checkbox" id="billingAddr" onClick={handleCheck} name="billing" value="same address"/>
                    </div>
                    </div>
                    <br />
                    {!checkbox ? (
                      
                    <div id="content" className="col-md-8 order-md-1">
                    <div className="custom-title">
                    <br /><h3>Billing details</h3>
                    </div>
                      <br/>
                        <form>
                          <label className="label" htmlFor="exampleInputEmail1">Company Name</label>
                          <input name="ccBillCompanyName" ref={billCompanyName} id="billCompanyName" className="form-control form-control-lg" placeholder="Billing Company Name" />
                          <label className="label" htmlFor="exampleInputEmail1">First Name</label>
                          <input name="ccBillFirstName" ref={billFirstName} id="billFirstName" className="form-control form-control-lg" placeholder="Billing First Name" />
                          <label className="label" htmlFor="exampleInputEmail1">Last Name</label>
                          <input name="ccBillLastName" ref={billLastName} id="billLastName" className="form-control form-control-lg" placeholder="Billing Last Name" />                      
                          <label className="label" htmlFor="exampleInputEmail1">Street</label>
                          <input name="ccBillStreet" ref={billStreet} id="billStreet" className="form-control form-control-lg" placeholder="Billing Street" />
                          <label className="label" htmlFor="exampleInputEmail1">Address 2</label>
                          <input name="ccBillAddress2" ref={billAddress2} id="billAddress2" className="form-control form-control-lg" placeholder="Billing Address 2" />                      
                          <label className="label" htmlFor="exampleInputEmail1">City</label>
                          <input name="ccBillCity" ref={billCity} id="billCity" className="form-control form-control-lg" placeholder="Billing City" />
                          <label className="label" htmlFor="exampleInputEmail1">State</label>
                          <div className="select"><select ref={billState} id="billState" defaultValue="" required="">
                            <option value=""  disabled="">Choose...</option>
                            <option value="AK">AK</option>
                            <option value="AL">AL</option>
                            <option value="AR">AR</option>
                            <option value="AZ">AZ</option>
                            <option value="CA">CA</option>
                            <option value="CO">CO</option>
                            <option value="CT">CT</option>
                            <option value="DC">DC</option>
                            <option value="DE">DE</option>
                            <option value="FL">FL</option>
                            <option value="GA">GA</option>
                            <option value="HI">HI</option>
                            <option value="IA">IA</option>
                            <option value="ID">ID</option>
                            <option value="IL">IL</option>
                            <option value="IN">IN</option>
                            <option value="KS">KS</option>
                            <option value="KY">KY</option>
                            <option value="LA">LA</option>
                            <option value="MA">MA</option>
                            <option value="MD">MD</option>
                            <option value="ME">ME</option>
                            <option value="MI">MI</option>
                            <option value="MN">MN</option>
                            <option value="MO">MO</option>
                            <option value="MS">MS</option>
                            <option value="MT">MT</option>
                            <option value="NC">NC</option>
                            <option value="ND">ND</option>
                            <option value="NE">NE</option>
                            <option value="NH">NH</option>
                            <option value="NJ">NJ</option>
                            <option value="NM">NM</option>
                            <option value="NV">NV</option>
                            <option value="NY">NY</option>
                            <option value="OH">OH</option>
                            <option value="OK">OK</option>
                            <option value="OR">OR</option>
                            <option value="PA">PA</option>
                            <option value="RI">RI</option>
                            <option value="SC">SC</option>
                            <option value="SD">SD</option>
                            <option value="TN">TN</option>
                            <option value="TX">TX</option>
                            <option value="UT">UT</option>
                            <option value="VA">VA</option>
                            <option value="VT">VT</option>
                            <option value="WA">WA</option>
                            <option value="WI">WI</option>
                            <option value="WV">WV</option>
                            <option value="WY">WY</option>
                          </select>
                        </div>
                        <label className="label" htmlFor="exampleInputEmail1">Zip</label>
                        <input name="ccBillZip" ref={billZip} id="billZip" className="form-control form-control-lg" placeholder="Billing Zip Code" maxLength="5"
                          size="5" required/>
                      </form>
                    </div>
                    )  : (null )
                  }
                    <br />
                    <div className="custom-title">
                    <br /><h3>Payment Information</h3>
                    </div>
                      <br/>
                    <form>
                    <label className="label" htmlFor="exampleInputEmail1">Name</label>
                      <input name="ccName" ref={ccName} id="ccNameclassName=" className="form-control form-control-lg" placeholder="Name on Credit Card" />
                      <label className="label" htmlFor="exampleInputEmail1">Type of Card</label>
                      <input name="ccType" ref={ccType} id="ccType" className="form-control form-control-lg" placeholder="Credit Card Type" />
                      <label className="label" htmlFor="exampleInputEmail1">Card Number</label>
                      <input name="ccNumber" ref={ccNumber} id="ccNumber" className="form-control form-control-lg" placeholder="Credit Card Number" />
                      <label className="label" htmlFor="exampleInputEmail1">Security Code</label>
                      <input name="ccSecurityCode" ref={ccSecurityCode} id="ccSecurityCode" className="form-control form-control-lg" placeholder="CC Security Code" />
                      <label className="label" htmlFor="exampleInputEmail1">Expiration Date</label>
                      <input name="ccExpirationDate" ref={ccExpDate} id="ccExpDate" className="form-control form-control-lg" placeholder="CC Expiration Date" />
                    </form>
                      {state.cartItems.map(result => (
                        <div key={result._id}>
                          <CartData
                            name = {result.name}
                            productID = {result.productID}
                            prodInfo = {result.prodInfo}
                          />
                        </div>
                      ))}
                      <table>
                      <thead>
                        <tr>
                          <th className="alignCenter">Product</th>
                          <th className="alignCenter">Package Size</th>
                          <th className="alignCenter">Quantity</th>
                          <th className="alignCenter">Price</th>
                          <th className="alignCenter">Item Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>SubTotal:</td>
                        <td>${formatter.format(state.subTotal)}</td>
                      </tr>
                      {state.discount ? (
                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td>Discount ({state.discountAmt}%)</td>
                          <td>${formatter.format(state.discountAmt/100 * state.subTotal)}</td>
                        </tr>                        
                      ) : (
                        <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>No discount applied</td>
                        <td></td>
                      </tr>
                      )}
                     <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>Sales Tax ({state.salesTax}%)</td>
                        <td>${formatter.format(state.salesTaxAmt)}</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>Shipping Fee (Flat Rate):</td>
                        <td>${state.shipFee}</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>Order Total:</td>
                        <td>${formatter.format(state.orderTotal)}</td>
                      </tr>
                        </tbody>
                      </table>
                  </div>
                  </div>
                  </div>
                  </div>
                ) : (
                 <div className="row text-center h-100">
                   <div className="col-md-12 text-center my-auto">
                     <h3><strong>No CheckOut Information</strong></h3>
                   </div>
                 </div>
               )}
             </div>
{/*              <Link className="mr-auto brand btn myButton buttonMargin font-weight-bold" to="/ThankYou" > */}
             <button className="btn myButton buttonMargin" style={{ fontSize: "20px"}} onClick={handleSubmitBtnClick}><strong>Place Order</strong></button>
{/*          </Link> */}
          </div>

        </Container>
      </Container>
      </div>

      </section>
    </div>
    
    </Fragment>
  );
}

export default Checkout;