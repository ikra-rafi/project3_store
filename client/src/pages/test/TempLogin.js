import React, { useEffect, useState} from "react";
import API from "../../utils/API";

import LoginData from "../../components/Test/LoginData"
import {Row, Container} from "../../components/Test/Grid";

function TempLogin () {
    // set up state for saved books and a trigger
    const [login, setLogin]= useState([]);
    // const [trigger, setTrigger] = useState("1");

    // const storeLogin = [{
    //     email: "ashley@gmail.com",
    //     password: "helloThere",
    //     securityQuestion: "What is favorite color?",
    //     securityAnswer: "orange",
    //     admin: true,
    //     discount: 10
    // },
    // {
    //     email: "john@aol.com",
    //     password: "nobodyHome",
    //     securityQuestion: "What was your first car?",
    //     securityAnswer: "corvette",
    //     admin: false,
    //     discount: 25
    // },
    // {
    //     email: "luna@gmail.com",
    //     password: "flower",
    //     securityQuestion: "What is your favorite cereal?",
    //     securityAnswer: "Shredded Wheat",
    //     admin: true,
    //     discount: 10
    // }
        
    // ];

    // Load all saved books and store them with setBooks
    // useEffect(() => {
    //     console.log("in useEffect orders");
    //     saveOrders(storeOrders);
    //   })
    useEffect(() => {
        console.log("login Effect");
        getLogin();
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


    // function saveLogin(storeLogin) {
    //     console.log("inside login");
    //     console.log(storeLogin);
    //     API.saveLogin(storeLogin)
    //     .then(res => API.getLogin()
    //                     .then(res=> { console.log("login"); console.log(res.data); login =res.data})
    //                     .catch(err => console.log(err))
            
    //         )
    //     .catch(err => console.log(err));
    // }

    // function handleLoginBtnClick(event) {
    //     API.saveLogin(storeLogin)
    //         .then(res => {
    //             console.log("login");
    //             console.log(res.data);
    //             setLogin(res.data);
    //         })
    //         .catch(err => console.log(err));
    // }

    function getLogin() {
        API.getLogin()
        .then(res=> {
            console.log(res.data);
            setLogin(res.data);
        })
        .catch(err => console.log(err))
    }

    // return the rendered saved books page
    return (
            <Container fluid>
                <button className="btn myButton buttonMargin" style={{ fontSize: "20px"}} ><strong>Login</strong></button>
                <Row>
                <div className="container-fluid containerColor marginBottomCont">
                    {login.length ? (
                        <div>
                            {login.map(result => (
                                <div key={result._id}>
                                    <LoginData
                                        id = {result._id}
                                        email = {result.email}
                                        password = {result.password}
                                        securityQuestion = {result.securityQuestion}
                                        securityAnswer = {result.securityAnswer}
                                        admin = {result.admin}
                                        discount = {result.discount}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="row text-center h-100">
                            <div className="col-md-12 text-center my-auto">
                                <h3><strong>No Saved Login</strong></h3>
                            </div>
                        </div>
                    )}
                </div>
                </Row>
            </Container>
        )
}

export default TempLogin;