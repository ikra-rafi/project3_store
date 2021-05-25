import React from "react";

function CartData (props) {

    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,      
      maximumFractionDigits: 2,
    });

    return (
            <tr key={props.dbID}>
              <td className="align-middle text-center">{props.name}</td>
              <td className="align-middle text-center">{props.prodInfo.size}</td>
              <td className="align-middle text-center">{props.prodInfo.quantity}</td>
              <td className="align-middle text-center">${formatter.format(props.prodInfo.price)}</td>
              <td className="align-middle text-center">${formatter.format(props.prodInfo.price * props.prodInfo.quantity)}</td>
            </tr>
    );
}

export default CartData;