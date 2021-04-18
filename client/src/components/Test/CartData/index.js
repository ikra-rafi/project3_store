import React from "react";

function CartData (props) {

    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,      
      maximumFractionDigits: 2,
    });

    return (
        <div>
        <table className="table table-curved table-responsive">
        <thead>
          <tr>
            <th className="alignCenter">Product</th>
            <th className="alignCenter">Package Size</th>
            <th className="alignCenter">Quantity</th>
            <th className="alignCenter">Price</th>
            <th className="alignCenter">Item Total</th>
          </tr>
        </thead>
        <tbody >
            <tr>
              <td className="align-middle text-center"><p>{props.name}</p></td>
              <td className="align-middle text-center"><p>{props.prodInfo.size}</p></td>
              <td className="align-middle text-center"><p>{formatter.format(props.prodInfo.quantity)}</p></td>
              <td className="align-middle text-center"><p>{formatter.format(props.prodInfo.price)}</p></td>
              <td className="align-middle text-center"><p>${formatter.format(props.prodInfo.price * props.prodInfo.quantity)}</p></td>
            </tr>

            </tbody>
        </table>
    </div>
    );
}

export default CartData;