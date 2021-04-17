import React, { useEffect, useState} from "react";
import API from "../../utils/API";

import OrderData from "../../components/Test/OrderData"
import {Row, Container} from "../../components/Test/Grid";

function TempOrders () {
    // set up state for saved books and a trigger
    const [orders, setOrders]= useState([]);

    // const storeOrders = [
    //     { orderNum: "AA0013",
    //       shippingAddress: {
    //           name: "Ashley Stith",
    //           street: "221 Baker Street",
    //           city: "London",
    //           state: "CT",
    //           zip: "03821"
    //       },
    //       email: "ashley@gmail.com",
    //       phone: "555-222-1111",
    //       creditCard: {
    //           billingAddress: {
    //               name: "Ashley Stith",
    //               street: "221 Baker Street",
    //               city: "London",
    //               state: "CT",
    //               zip: "03821"
    //           },
    //           cardInfo: {
    //               cardNumber: "1111222233334444",
    //               cardType: "Visa",
    //               securityCode: "735",
    //               expirationDate: "07/31/2023"
    //           }
    //       },
    //       spices: [
    //         {
    //             name: "turmeric",
    //             size: "4oz bottle",
    //             price: "5.99",
    //             quantity: 1,
    //         },
    //         {
    //             name: "peppermint extract",
    //             size: "8oz bottle",
    //             price: "3.99",
    //             quantity: 1,
    //         }
    //       ],
    //       orderTotal: 9.99
    //     },
    //     { orderNum: "AA0013",
    //       shippingAddress: {
    //           name: "John Toth",
    //           street: "125 Morning Mist Lane",
    //           city: "Frederick",
    //           state: "MD",
    //           zip: "21702"
    //       },
    //       email: "john@gmail.com",
    //       phone: "555-332-8789",
    //       creditCard: {
    //           billingAddress: {
    //               name: "John Toth",
    //               street: "125 Morning Mist Lane",
    //               city: "Frederick",
    //               state: "MD",
    //               zip: "21702"
    //           },
    //           cardInfo: {
    //               cardNumber: "8888222277773333",
    //               cardType: "MasterCard",
    //               securityCode: "194",
    //               expirationDate: "12/31/2026"
    //           }
    //       },
    //       spices: [
    //         {
    //             name: "garlic",
    //             size: "4oz bottle",
    //             price: "4.99",
    //             quantity: 2,
    //         },
    //         {
    //             name: "Steakmate seasoning",
    //             size: "4oz bottle",
    //             price: "4.99",
    //             quantity: 1,
    //         }
    //       ],
    //       orderTotal: 14.97
    //     },
    // ]

    // Load all saved books and store them with setBooks
    // useEffect(() => {
    //     console.log("in useEffect orders");
    //     saveOrders(storeOrders);
    //   })
    useEffect(() => {
        console.log("orders Effect");
        getOrders();
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


    // function saveOrders(storeOrders) {
    //     console.log("inside orders");
    //     console.log(storeOrders);
    //     API.saveOrders(storeOrders)
    //     .then(res => API.getOrders()
    //                     .then(res=> { console.log("orders"); console.log(res.data); orderData =res.data})
    //                     .catch(err => console.log(err))
            
    //         )
    //     .catch(err => console.log(err));
    // }

    // function handleOrderBtnClick(event) {
    //     API.saveOrders(storeOrders)
    //         .then(res => {
    //             console.log("orders");
    //             console.log(res.data);
    //             setOrders(res.data);
    //         })
    //         .catch(err => console.log(err));
    // }

    function getOrders() {
        API.getOrders()
        .then(res=> {
            console.log(res.data);
            setOrders(res.data);
        })
        .catch(err => console.log(err))
    }

    // return the rendered saved books page
    return (
            <Container fluid>
                                <button className="btn myButton buttonMargin" style={{ fontSize: "20px"}} ><strong>Orders</strong></button>
                <Row>
                <div className="container-fluid containerColor marginBottomCont">
                    {orders.length ? (

                                            <div>
                                                {orders.map(result => (
                                                    <div key={result._id}>
                                                        <OrderData
                                                            id = {result._id}
                                                            orderNum = {result.orderNum}
                                                            shippingAddress = {result.shippingAddress}
                                                            email = {result.email}
                                                            phone = {result.phone}
                                                            creditCard = {result.creditCard}
                                                            spice = {result.spice}
                                                            orderTotal = {result.orderTotal}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                    ) : (
                        <div className="row text-center h-100">
                            <div className="col-md-12 text-center my-auto">
                                <h3><strong>No Saved Orders</strong></h3>
                            </div>
                        </div>
                    )}
                </div>
                </Row>
            </Container>
    )
}

export default TempOrders;