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
// When mounted, the window scrolls to the top of the page on render.
// It then makes a call will be made to get products and calls the setProduct function to get the correct product
// It then sets the packaging state
// It then makes a call to get the comments associated with the product
  componentDidMount() {
    window.scrollTo(0, 0);
    API.getProducts()
    .then(products => {
      this.setState({products: products});
      this.setProduct();
      this.setState({packaging: this.state.product.packaging});
      API.getComments()
      .then(res => {
        const results = res.data.filter(result => result.productID === this.state.product.productID)
        this.setState({comments:results});
      })
    })
    .catch(err => console.log(err));
  }

// setProduct searches for the product based on the id that is passed in as a URL parameter.
// It then sets the additional states associated with the product
  setProduct = () => {
    const index = this.state.products.findIndex(product => product._id === this.state.id);

    this.setState({product: this.state.products[index]});
    this.setState({ratings: this.state.product.ratings});
    this.setState({commentIDs: this.state.product.commentIDs})


  }

  // Returns breadcrumbs, ProductDetail and Comments components.  The product states are passed in as props
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
          <Comments product = {this.state.comments}
                    name = {this.state.product.name}/>
      </div>
      </div>
    </Fragment>
    );
  }

}

export default ProductDetails;