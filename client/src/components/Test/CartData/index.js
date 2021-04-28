import React from "react";

function CartData (props) {

    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,      
      maximumFractionDigits: 2,
    });

    return (
      <div className="row">
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"></div>
        <div className="table-responsive text-center">
        <table className="table table-bordered">
        <thead>
          <tr className="shop_cart_tr">
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
    </div>
    );
}

export default CartData;