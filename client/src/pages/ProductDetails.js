import React, { Component } from 'react';
//import Container from "../components/Container";
import ProductDetail from "../components/ProductDetail";
import Comments from "../components/Comments";
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
      comments: [],
      productID: "",
      packaging: [{}]
    }
}

  componentDidMount() {
    API.getProducts()
    .then(products => {
      console.log(products);
      this.setState({products: products});
      this.setProduct();
      console.log(this.state.product);
      this.setState({packaging: this.state.product.packaging});
      API.getComments()
      .then(res => {
        console.log(res.data);
        const results = res.data.filter(result => result.productID === this.state.product.productID)
        console.log(results);
        this.setState({comments:results});
      })
    })
    .catch(err => console.log(err));
  }

  setProduct = () => {
    const index = this.state.products.findIndex(product => product._id === this.state.id);

    this.setState({product: this.state.products[index]});
    this.setState({ratings: this.state.product.ratings});
    this.setState({commentIDs: this.state.product.commentIDs})


  }

  render () {
    return (
      <div>
          <ProductDetail product = {this.state.product}
                         ratings = {this.state.ratings}
                         packaging = {this.state.packaging}/>
          <Comments product = {this.state.comments}
                    name = {this.state.product.name}/>
      </div>
    );
  }

}

export default ProductDetails;