import React, { Component } from 'react';
import Container from "../components/Container";
import ProductDetail from "../components/ProductDetail";
import API from '../utils/API';

class ProductDetails extends Component {

  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      id : props.location.pathname.split("/").pop(),
      product: {},
      products:[]
    }
}

  componentDidMount() {
    API.getProducts()
    .then(products => {
      console.log(products);
      this.setState({products: products});
      this.setProduct();
    })
    .catch(err => console.log(err));
  }

  setProduct = () => {
    const index = this.state.products.findIndex(product => product._id === this.state.id);

    this.setState({product: this.state.products[index]});

  }

  render () {
    return (
      <div>
          <ProductDetail product = {this.state.product}/>
      </div>
    );
  }

}

export default ProductDetails;