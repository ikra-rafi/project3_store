import React from "react";

const ProductContext = React.createContext({
  name: "",
  description: "",
  packaging: {},
  healthBenefit: "",
  picLink: "",
  family: {},
  region: {},
  productId: "",
  ratings: [{}],
  commentIDs: [],
  handleBtnClick: () => {}
});

export default ProductContext;
