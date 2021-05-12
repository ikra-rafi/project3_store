import React from "react";

function CartData (props) {

    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,      
      maximumFractionDigits: 2,
    });

    return (
            <tr key={props.dbID}>
              <td className="align-middle text-center"><p>{props.name}</p></td>
              <td className="align-middle text-center"><p>{props.prodInfo.size}</p></td>
              <td className="align-middle text-center"><p>{props.prodInfo.quantity}</p></td>
              <td className="align-middle text-center"><p>${formatter.format(props.prodInfo.price)}</p></td>
              <td className="align-middle text-center"><p>${formatter.format(props.prodInfo.price * props.prodInfo.quantity)}</p></td>
            </tr>
    );
}

export default CartData;