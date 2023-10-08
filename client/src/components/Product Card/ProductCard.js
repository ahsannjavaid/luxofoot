import React from "react";
import { Link } from "react-router-dom";
import {
  productCardDescriptionTextStyle,
  productCardImageStyle,
  productCardImageTopStyle,
  productCardStockTextStyle,
  productCardStyle,
} from "./style";

export const cartItems = [];
const AddToCart = (ID) => {
  cartItems.push(ID);
};

const ProductCard = (props) => {
  return (
    <>
      <div
        className="card border-dark border-2 shadow mb-5"
        style={productCardStyle}
      >
        <Link to={`product-details/${props.id}`}>
          <div className="card-img-top" style={productCardImageTopStyle}>
            <img
              src={props.img}
              style={productCardImageStyle}
              alt={props.name}
            />
          </div>
        </Link>
        <div className="card-body text-center">
          <h6 className="card-title fw-bold">{props.name}</h6>
          <h5 className="card-title">
            PKR <b>{props.price}</b>
          </h5>
          <h6
            style={productCardStockTextStyle}
            className={`card-title ${
              props.status === true ? "" : "text-danger"
            }`}
          >
            {props.status ? "" : "Out of Stock"}
          </h6>
          <div
            className="text-truncate"
            style={productCardDescriptionTextStyle}
          >
            <span className="card-text">Made in {props.desc}</span>
          </div>
          <button onClick={() => AddToCart(props.id)} className="btn btn-dark">
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
