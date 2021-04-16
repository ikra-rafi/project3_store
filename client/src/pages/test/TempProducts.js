import React, { useEffect, useState} from "react";
import API from "../../utils/API";

import ProductData from "../../components/Test/ProductData"
import {Row, Container} from "../../components/Test/Grid";

function Temp () {
    // set up state for saved books and a trigger
    const [products, setProducts]= useState([]);
    // const [trigger, setTrigger] = useState("1");
    // var john = [];

    // const storeProducts = [
    //     { name: "cinnamon",
    //       description: "sweet taste ground bark for baking",
    //       packaging: [
    //           { size: "4oz bottle",
    //             price: "5.99",
    //             quantity: 5
    //           },
    //           { size: "16 oz flatpack",
    //             price: "9.99",
    //             quantity: 10
    //           }],
    //       healthbenefit: "www.cnn.com",
    //       picLink: "./images/cinnamon",
    //       historyDetails: "Cinnamon hails from 5 regions of the world",
    //       family: {
    //           baking: true,
    //           grilling: false,
    //           seasoning: false,
    //           extract: false,
    //           teas: false
    //       },
    //       region: {
    //           india: false,
    //           asia: true,
    //           carribean: false,
    //           middleEast: false,
    //           african: false,
    //           latinAmerica: false,
    //           europe: false
    //       },
    //       productID: "Cinn0001",
    //       ratings: [{ stars: 4, stars: 5, stars: 3, stars: 4}]
    //     },
    //     { name: "paprika",
    //       description: "sweet red pepper dried and ground",
    //       packaging: [
    //           { size: "4oz bottle",
    //             price: "3.99",
    //             quantity: 2
    //           },
    //           { size: "16 oz flatpack",
    //             price: "5.99",
    //             quantity: 3
    //           }],
    //       healthbenefit: "www.bbc.com",
    //       picLink: "./images/paprika",
    //       historyDetails: "Paprika comes from 2 regions - Hungary or Spain.   It comes in sweet, hot & smoked.",
    //       family: {
    //           baking: true,
    //           grilling: true,
    //           seasoning: true,
    //           extract: false,
    //           teas: false
    //       },
    //       region: {
    //           india: false,
    //           asia: false,
    //           carribean: false,
    //           middleEast: false,
    //           african: false,
    //           latinAmerica: false,
    //           europe: true
    //       },
    //       productID: "Paprika0025",
    //       ratings: [{ stars: 2, stars: 2, stars: 5, stars: 3}]
    //     }
    // ]

    // Load all saved books and store them with setBooks
    useEffect(() => {
        console.log("in useEffect");
        getProducts();
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


//     function saveProducts(storeProducts) {
//         console.log("inside saveProducts");
//         console.log(storeProducts);
//         API.saveProducts(storeProducts)
//         // .then(res => API.getProducts()
//         //                 .then(res=> { console.log("products"); console.log(res.data); john =res.data; console.log("john=" + john)
//         //                 console.log("length = " + john.length)
//         //                 setProducts(john)})
//         //                 .catch(err => console.log(err))
            
// //            )
//         .catch(err => console.log(err));
//     }

    // function handleBtnClick(event) {
    //     API.saveProducts(storeProducts)
    //        .then(res=> { console.log("products"); console.log(res.data); john =res.data; console.log("john=" + john)
    //                     console.log("length = " + john.length)
    //                     setProducts(john)})
    //         .catch(err => console.log(err));
    // }

    function getProducts() {
        API.getProducts()
        .then(res=> {
            console.log(res.data);
            setProducts(res.data);
        })
        .catch(err => console.log(err))
    }

    // return the rendered saved books page
    return (
            <Container fluid>
                <button className="btn myButton buttonMargin" style={{ fontSize: "20px"}} ><strong>Products</strong></button>
                <Row>
                <div className="container-fluid containerColor marginBottomCont">
                    {products.length ? (

                                            <div>
                                                {products.map(result => (
                                                    <div key={result._id}>
                                                        <ProductData
                                                            id = {result._id}
                                                            name = {result.name}
                                                            description = {result.description}
                                                            healthbenefit = {result.healthbenefit}
                                                            picLink = {result.picLink}
                                                            historyDetails = {result.historyDetails}
                                                            family = {result.family}
                                                            region = {result.region}
                                                            productID = {result.productID}
                                                            ratings = {result.ratings}
                                                            packaging = {result.packaging}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                    ) : (
                        <div className="row text-center h-100">
                            <div className="col-md-12 text-center my-auto">
                                <h3><strong>No Saved Products</strong></h3>
                            </div>
                        </div>
                    )}
                </div>
                </Row>
            </Container>
    )
}

export default Temp;