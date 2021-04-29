import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import CartData from "../components/CartData"
import {Container} from "../components/Grid";
import API from "../utils/API";
import { useTodoContext} from "../utils/store";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumbs";
import MetaTags from "react-meta-tags";

function Checkout() {
  // set up references to fields on page
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

  // setting up state variables
  const [state, dispatch] = useTodoContext();
  let history = useHistory();
  const [checkbox, setCheckbox] = useState();
  const [changePage, setChangePage] = useState({redirectTo: null});
  const [loginInfo, setLoginInfo] = useState({_id: 0, email: ""}); 

  // formats float variables to specified digits for decimal places
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,      
    maximumFractionDigits: 2,
  });

  // function to set state for checkbox being checked or not
  function handleCheck(e) {
    setCheckbox(e.target.checked);
  }

  useEffect(() => {
    // check if user logged in
    if(state.loggedIn) {
      // get login information
      getLogin();
    }
    // retrieve cart contents
    getCart();
  }, [])

  // function to retrieve id of the logged in user
  function getLogin(){
    var loginObj = {
      password: "",
      email: state.email
    }
    // api call to find the user information
    API.getOrdersAcct(loginObj)
      .then(res => {
        // check if user logged in
        if(state.loggedIn) {
            // set state information with logged in user email and _id
            setLoginInfo({...loginInfo, email: state.email, _id: res.data._id})
          // user not logged in
        } else if (!state.loggedIn)
        {
            // set state info to reflect no user _id
            setLoginInfo({...loginInfo, email: "", _id: 0})
        }
      })
      .catch(err => console.log(err));
  }

  // function to handle the submit button
  function handleSubmitBtnClick(e) {
    e.preventDefault();
    // object to hold all the page fields before writing the order info
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

    // loop over the cart items to store products to object
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
      // set each spice's info into the array of spices for the order
      orderInfo.spices[i] = tempspices;
    }

    // api call to save the order information
    API.saveOrders(loginInfo._id, state.loggedIn, orderInfo)
      .then(res => {
        // check if order save was successful
        if(res.status === 200) {
          // api call to delete all items out of shopping cart table now that order was placed
          API.deleteCart()
            .then(result => {
              // check if delete cart was successful
              if(res.status===200) {
                // redirect to the thank you page
                history.push("/ThankYou");
              }
            })
        }
      }) 
      .catch(err => console.log(err));
  }

  // function to retrieve all the cart items to display on page
  function getCart() {
    var salesTaxCalc;
    var newSubTotal;
    // check if user logged in
    if(state.loggedIn) {
      // calculate new salestax and subtotal based upon user being logged in
      salesTaxCalc = ((parseFloat(state.subTotal) - parseFloat(state.discountTotal)) * parseFloat(state.salesTax)/100);
      newSubTotal = ((parseFloat(state.subTotal) - parseFloat(state.discountTotal)));
    }
    // user not logged in
    else {
      // calculate sales tax and new subtotal with discount applied for being logged in
      salesTaxCalc = (parseFloat(state.subTotal)) * parseFloat(state.salesTax)/100;
      newSubTotal = (parseFloat(state.subTotal));
    }

    // save new orderTotal to the store
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

      <Container fluid>
        <Container >
  
    <section className="checkout_section justify-content-center">
      <div className="container full-width">
      <div className="row">
   

              <div className="container-fluid containerColor marginBottomCont">
               <h1 className="text-center">Checkout Page</h1> 
               <h1 className="text-center">Cart Total = ${formatter.format(state.orderTotal)}</h1>
               
               {state.cartItems.length ? (
                  <div>
                    
                    <div id="content">
                    <div className="contactform" method="post" className="shopform">
                    <div className="custom-title">
                     <h3>Shipping details</h3>
                    </div>
                      <br/>
                      <div  className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <form id={1} className="searchForm justify-content-center m-2" key={1}>
                      
                      <div className="row justify-content-center">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <label className="label" htmlFor="exampleInputEmail1">Company Name</label>
                          <input name="shipCompanyName" ref={shipCompanyName} id="shipCompanyName" className="form-control form-control-lg" placeholder="Ship Company Name" />
     
                          <label className="label" htmlFor="exampleInputEmail1">First Name</label>
                          <input name="shipFirstName" ref={shipFirstName} id="shipFirstName" className="form-control form-control-lg" placeholder="Ship First Name" />
                          
                          
                          <label className="label" htmlFor="exampleInputEmail1">Last Name</label>
                          <input name="shipLastName" ref={shipLastName} id="shipLastName" className="form-control form-control-lg" placeholder="Ship Last Name" />

                          <label className="label" htmlFor="exampleInputEmail1">Address</label>
                          <input type="text"name="shipStreet" ref={shipStreet} id="shipStreet" className="form-control form-control-lg" placeholder="Shipping Street" />

                          <label className="label" htmlFor="exampleInputEmail1">Address #2</label>
                          <input  type="text" name="shipAddress2" ref={shipAddress2} id="shipAddress2" className="form-control form-control-lg" placeholder="Shipping Address #2" />
                          
                      

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
                            
                          <label className="label" htmlFor="exampleInputEmail1">Zip</label>
                          <input name="shipZip" ref={shipZip} id="shipZip" className="form-control form-control-lg" type="text" placeholder="Shipping Zip Code" maxLength="5"
                            size="5" required/>

                          <label className="label" htmlFor="exampleInputEmail1">Email</label>                      
                          <input type="email" ref={email} id="email" name="email" className="form-control form-control-lg" placeholder="email" />
                      <label className="label" htmlFor="exampleInputEmail1">Phone</label>
                      <input type="tel" ref={phone} id="phone" name="phone" className="form-control form-control-lg" placeholder="555-555-5555"
                          maxLength="12" size="12" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required/>
                      <label className="label" htmlFor="exampleInputEmail1">Notes</label>                      
                      <input name="notes" ref={notes} id="notes" className="form-control form-control-lg" placeholder="notes" />
                      </div></div> 
                      </form>

                    
                    <div className="payment_mth">
                    <form id="payment" className="clearfix" style={{display: "inline-block"}}>
                    <label className="form-check-label"  htmlFor="billingAddr">
                    <input className="form-check-input" type="checkbox" id="billingAddr" onClick={handleCheck} name="billing" value="same address"/> 
                    Billing address same as Shipping address
                    </label>
                    </form>
                    </div>

                

                    <br />
                    {!checkbox ? (
                      
                    <div id="content">
                    <div className="custom-title">
                    <br /><h3>Billing details</h3>
                    </div>
                      <br/>
                        <form >
                        <div className="row">
                    <div className="mb-3">
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
                          <div className="select" ><select class="custom-select d-block w-100" ref={billState} id="billState" defaultValue="" required="">
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
                    </div>
                    </div>
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

                    <div className="shop_cart">
                    <div className="container">
                        <div className="discount-coupon">     
                           <h4>Cart Totals</h4>
                        </div> 
                        <div className="row" style={{width: "100%", overflowX: "hidden"}}>
 
                      {state.cartItems.map(result => (
                        <div key={result._id}>
                          <CartData
                            name = {result.name}
                            productID = {result.productID}
                            prodInfo = {result.prodInfo}
                          />
                        </div>
                      ))}
      
                      </div>
                  <div className="shop_cart_bottom">
                    <div className="container">
                        <div className="row">
                  <div className="col-lg-4 col-sm-12">
                  <div className="grand-total-area">
                  <h4>Cart Total</h4>           
                        <p className="sub-total">SubTotal:
                        <span className="amt">${formatter.format(state.subTotal)}</span></p>
                      {state.discount ? (
                          <p className="discount">Discount ({state.discountAmt}%)
                          <span className="amt">${formatter.format(state.discountAmt/100 * state.subTotal)}</span></p>                     
                      ) : (
                        <p className="discount">No discount applied
                        <span className="amt"></span></p>
                      )}
                        <p className="amt">Sales Tax ({state.salesTax}%)
                        <span className="amt">${formatter.format(state.salesTaxAmt)}</span></p>
                        <p className="delivery">Shipping Fee (Flat Rate):
                        <span className="amt">${state.shipFee}</span></p>
                        <p className="grand-total">Order Total:
                        <span className="amt">${formatter.format(state.orderTotal)}</span></p>
                                </div>
                            </div>
                        </div>
                </div>
                  </div>
                  </div>
                  </div></div></div></div></div>
                  
                ) : (
                 <section>
                 <div className="row text-center h-100">
                   <div className="col-md-12 text-center my-auto">
                     <h3><strong>No CheckOut Information</strong></h3>
                   </div>
                 </div>
                 </section>
               )}
             </div>
{/*              <Link className="mr-auto brand btn myButton buttonMargin font-weight-bold" to="/ThankYou" > */}
             <button type="submit" className="btn myButton buttonMargin" style={{ fontSize: "20px"}} to="/ThankYou" onClick={handleSubmitBtnClick}><strong>Place Order</strong></button>
             {/* <button className="btn myButton buttonMargin" style={{ fontSize: "20px"}} onClick={handleSubmitBtnClick}><strong>Place Order</strong></button> */}
{/*          </Link> */}
          </div>
          </div>

</section>
            

        </Container>
      </Container>
 
      </div>

    </Fragment>
  );
}

export default Checkout;