import React, { Fragment, Component } from 'react';
//import Container from "../components/Container";
import ProductDetail from "../components/ProductDetail";
import Comments from "../components/Comments";
import API from '../utils/API';
import MetaTags from "react-meta-tags";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumbs";

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
      <Fragment>
      <MetaTags>
        <title>spice-A-holic | Product Details</title>
        <meta
          name="description"
          content="Organic spices."
        />
      </MetaTags>

     <div className="contact-page">

       {/*====================  breadcrumb area ====================*/}

       <Breadcrumb title="Product Details" />
  
       {/*====================  End of breadcrumb area  ================*/}


        {/*====================  Contact Form  area  ====================*/}       
      <div>
          <ProductDetail product = {this.state.product}
                         ratings = {this.state.ratings}
                         packaging = {this.state.packaging}/>
          <Comments product = {this.state.comments}/>
      </div>
      </div>
    </Fragment>  
    );
  }

}

export default ProductDetails;