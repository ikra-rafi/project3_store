import React, { useEffect, useState} from "react";
import API from "../../utils/API";

import CartData from "../../components/Test/CartData"
import {Row, Container} from "../../components/Test/Grid";

function TempCart () {
    // set up state for saved books and a trigger
    const [cart, setCart]= useState([]);
    // const [trigger, setTrigger] = useState("1");
    // var orderData = [];

    // const storeCart = [ 
    //     { name: "salt",
    //       productID: "SA0003",
    //       prodInfo: {
    //         size: "4oz bottle",
    //         price: "4.99",
    //         quantity: 1
    //       }
    //     },
    //     {
    //       name: "ground ginger",
    //       productID: "GIN0002",
    //       prodInfo: {
    //         size: "16oz package",
    //         price: "12.99",
    //         quantity: 1
    //       }
    //     },
    //     {
    //       name: "chamomile tea",
    //       productID: "CHAM0015",
    //       prodInfo: {
    //         size: "4oz package",
    //         price: "5.99",
    //         quantity: 2
    //       }
    //     }
    // ]
    // Load all saved books and store them with setBooks
    // useEffect(() => {
    //     console.log("in useEffect orders");
    //     saveOrders(storeOrders);
    //   })
    useEffect(() => {
        console.log("cart Effect");
        getCart();
    }, [])

    // function to retrieve the saved books from database
    // function loadSavedBooks() {
    //     API.getBooks()
    //       .then(res => {
    //         // set state to returned list of saved books
    //         setSavedBooks(res.data)
    //       })
    //     .catch(err => console.log(err));
    // };


    // function saveCart(storeCart) {
    //     console.log("inside cart");
    //     console.log(storeCart);
    //     API.saveCart(storeCart)
    //     .then(res => API.getCart()
    //                     .then(res=> { console.log("cart"); console.log(res.data); cart =res.data})
    //                     .catch(err => console.log(err))
            
    //         )
    //     .catch(err => console.log(err));
    // }

    // function handleCartBtnClick(event) {
    //     API.saveCart(storeCart)
    //         .then(res => {
    //             console.log("cart");
    //             console.log(res.data);
    //             setCart(res.data);
    //         })
    //         .catch(err => console.log(err));
    // }

    function getCart() {
        API.getCart()
        .then(res=> {
            console.log(res.data);
            setCart(res.data);
        })
        .catch(err => console.log(err))
    }

    // return the rendered saved books page
    return (
            <Container fluid>
             <button className="btn myButton buttonMargin" style={{ fontSize: "20px"}} ><strong>Cart</strong></button>
                <Row>
                <div className="container-fluid containerColor marginBottomCont">
                    {cart.length ? (

                                            <div>
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
                                <h3><strong>No Saved Cart</strong></h3>
                            </div>
                        </div>
                    )}
                </div>
                </Row>
            </Container>
    )
}

export default TempCart;