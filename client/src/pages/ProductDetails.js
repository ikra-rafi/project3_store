import React, { Component } from 'react';
//import Container from "../components/Container";
import ProductDetail from "../components/ProductDetail";
import API from '../utils/API';

class ProductDetails extends Component {

  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      id : props.location.pathname.split("/").pop(),
      product: {},
      products:[],
      ratings:[],
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
    this.setState({ratings: this.state.product.ratings})
    console.log(this.state.ratings);

  }

  render () {
    return (
      <div>
          <ProductDetail product = {this.state.product}
                         ratings = {this.state.ratings}/>
      </div>
    );
  }

}

export default ProductDetails;