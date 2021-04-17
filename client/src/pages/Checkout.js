import React , { useEffect, useState, useContext} from "react";
import Cart from "../components/Cart";
import CartOrderContext from "../utils/cartOrderContext.js";
//import CreditCard from "../components/CreditCard";
import CartData from "../components/Test/CartData"
import {Row, Container} from "../components/Test/Grid";
import API from "../utils/API";
import { Link, useLocation } from "react-router-dom";

function ShoppingCart(props) {
  let shipName = React.createRef();
  let shipFirstName = React.createRef();
  let shipLastName = React.createRef();
  let shipStreet = React.createRef();
  let shipAddress2 = React.createRef();
  let shipCity = React.createRef();
  let shipState = React.createRef();
  let shipZip = React.createRef();
  let billName = React.createRef();
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

  const [cart, setCart]= useState([]);
  const [orders, setOrders] = useState([]);
  const [trigger, setTrigger] = useState("1");
  
  const {cartTotal} = useContext(CartOrderContext);
  
  console.log(cartTotal);
  const orderInfo = 
    {
      orderNum: "",
      shippingAddress: {
        name: "",
        street: "",
        city: "",
        state: "",
        zip: ""
      },
      email: "",
      phone: "",
      creditCard: {
        billingAddress: {
          name: "",
          street: "",
          city: "",
          state: "",
          zip: "",
        },
        cardInfo: {
          cardNumber: "",
          cardType: "",
          securityCode: "",
          cardName: "",
          expirationDate: ""
        }
      },
      spices: [],
      orderTotal: 0
    }

  useEffect(() => {
    console.log("cart Effect");
    getCart();
  }, [])

  const tempspices = 
    {
      name: "garlic",
      size: "4oz bottle",
      price: "4.99",
      quantity: 2
    }


  function handleContBtnClick(event) {
    event.preventDefault();

    orderInfo.shippingAddress.name = shipName.current.value;
    orderInfo.shippingAddress.street = shipStreet.current.value;
    orderInfo.shippingAddress.city = shipCity.current.value;
    orderInfo.shippingAddress.state = shipState.current.value;
    orderInfo.shippingAddress.zip = shipZip.current.value;
    orderInfo.creditCard.billingAddress.name = billName.current.value;
    orderInfo.creditCard.billingAddress.street = billStreet.current.value;
    orderInfo.creditCard.billingAddress.city = billCity.current.value;
    orderInfo.creditCard.billingAddress.state = billState.current.value;
    orderInfo.creditCard.billingAddress.zip = billZip.current.value;
    orderInfo.email = email.current.value;
    orderInfo.phone = phone.current.value;
    orderInfo.creditCard.cardInfo.cardName = ccName.current.value;
    orderInfo.creditCard.cardInfo.cardType = ccType.current.value;
    orderInfo.creditCard.cardInfo.cardNumber = ccNumber.current.value;
    orderInfo.creditCard.cardInfo.securitycode = ccSecurityCode.current.value;
    orderInfo.creditCard.cardInfo.expirationDate = ccExpDate.current.value;
    orderInfo.spices.push(tempspices);
    orderInfo.orderNum = "BL0001";
    console.log(orderInfo);
  }

  function handleSubmitBtnClick(e) {
    e.preventDefault();
    console.log(orderInfo);
    API.saveOrders(orderInfo)
      .then(res => {
        console.log("in save orders");
        console.log(res.data);
        console.log(res.data._id);
      }) 
  }

  function getCart() {
    API.getCart()
    .then(res=> {
        console.log(res.data);
        setCart(res.data);
    })
    .catch(err => console.log(err))
  }

  return (
    <div>
      <Container fluid>
        <Container >
        <Cart />
              <div className="container-fluid containerColor marginBottomCont">
               <h1 className="text-center">Checkout Page</h1> 
               <h1 className="text-center">Cart Total = {cartTotal}</h1>
               {cart.length ? (
                  <div>
                    <form id={1} className="searchForm justify-content-center m-2" key={1}>
{/*                       <input
                        value={props.searchString}
                        onChange={props.handleInputChange}
                        name="searchTerm"
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Search Term"
                        // disable the Enter key so a user hitting Enter doesn't accidentally reload the page with new data
                        onKeyPress={e => {
                        if (e.key === 'Enter') e.preventDefault();
                        }}
                      /> */}
                      <label className="label" htmlFor="exampleInputEmail1">Name</label>
                      <input name="shipName" ref={shipName} id="shipName" className="form-control form-control-lg" placeholder="Ship Name" />
                      <label className="label" htmlFor="exampleInputEmail1">Street</label>
                      <input name="shipStreet" ref={shipStreet} id="shipStreet" className="form-control form-control-lg" placeholder="Shipping Street" />
                      <label className="label" htmlFor="exampleInputEmail1">City</label>
                      <input name="shipCity" ref={shipCity} id="shipCity" className="form-control form-control-lg" placeholder="Shipping City" />
                      <label className="label" htmlFor="exampleInputEmail1">State</label>                      
                      <div className="select"><select ref={shipState} id="shipState" defaultValue="" required="">
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
                      <input name="shipZip" ref={shipZip} id="shipZip" className="form-control form-control-lg" placeholder="Shipping Zip Code" maxLength="5"
                            size="5" required/>
                      <label className="label" htmlFor="exampleInputEmail1">Email</label>                      
                      <input type="email" ref={email} id="email" name="email" className="form-control form-control-lg" placeholder="email" />
                      <label className="label" htmlFor="exampleInputEmail1">Phone</label>                      
                      <input type="tel" ref={phone} id="phone" name="phone" className="form-control form-control-lg" placeholder="phone" placeholder="555-555-5555"
                          maxLength="12" size="12" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required/>
                      <button className="btn myButton buttonMargin" style={{ fontSize: "20px"}} onClick={handleContBtnClick}><strong>Continue</strong></button>
                    </form>
                    <br />
                    <form>
                    <label className="label" htmlFor="exampleInputEmail1">Name</label>                      
                      <input name="ccBillName" ref={billName} id="billName" className="form-control form-control-lg" placeholder="Billing Name" />
                      <label className="label" htmlFor="exampleInputEmail1">Street</label>                      
                      <input name="ccBillStreet" ref={billStreet} id="billStreet" className="form-control form-control-lg" placeholder="Billing Street" />
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
                    <br />
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
                      {cart.map(result => (
                        <div key={result._id}>
                          <CartData
                            // id = {result._id}
                            name = {result.name}
                            productID = {result.productID}
                            prodInfo = {result.prodInfo}
                          />
                        </div>
                      ))}
                  </div>
                ) : (
                 <div className="row text-center h-100">
                   <div className="col-md-12 text-center my-auto">
                     <h3><strong>No CheckOut Information</strong></h3>
                   </div>
                 </div>
               )}
             </div>

             <Link className="mr-auto brand btn myButton buttonMargin font-weight-bold" to="/checkout" >
             <button className="btn myButton buttonMargin" style={{ fontSize: "20px"}} onClick={handleSubmitBtnClick}><strong>Place Order</strong></button>
         </Link>
        </Container>
      </Container>
    </div>
  );
}

export default ShoppingCart;