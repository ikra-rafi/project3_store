import React from "react";

function Project (props) {
    // set context for book search results


    return (
        <div>
            <h5>orderNum= {props.orderNum}</h5>
            <h5>email =  {props.email}</h5>
            <h5>phone =  {props.phone}</h5>
            <h5>orderTotal =  {props.orderTotal}</h5>
            <h5>shipping address</h5>
            <h5>name = {props.shippingAddress.name}</h5>
            <h5>street = {props.shippingAddress.street}</h5>
            <h5>city = {props.shippingAddress.city}</h5>
            <h5>state = {props.shippingAddress.state}</h5>
            <h5>zip = {props.shippingAddress.zip}</h5>
            <h5>Credit Card Info</h5>
            <h5>Billing Address</h5>
            <h5>name = {props.creditCard.billingAddress.name}</h5>
            <h5>street = {props.creditCard.billingAddress.street}</h5>
            <h5>city = {props.creditCard.billingAddress.city}</h5>
            <h5>state = {props.creditCard.billingAddress.state}</h5>
            <h5>zip = {props.creditCard.billingAddress.zip}</h5>
            <h5>Card Info</h5>
            <h5>cardNumber = {props.creditCard.cardInfo.cardNumber}</h5>
            <h5>cardType = {props.creditCard.cardInfo.cardType}</h5>
            <h5>securityCode = {props.creditCard.cardInfo.securityCode}</h5>
            <h5>cardName = {props.creditCard.cardInfo.cardName}</h5>
            <h5>expirationDate = {props.creditCard.cardInfo.expirationDate}</h5>
            {props.spice.map(result => (
                <div>
                    <h5>name = {result.name}</h5>
                    <h5>size = {result.size}</h5>
                    <h5>price = {result.price}</h5>
                    <h5>quantity = {result.quantity}</h5>
                </div>
            ))}
        </div>
    );
}

export default Project;