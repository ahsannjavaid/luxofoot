import React from 'react'
import { Link } from 'react-router-dom'

export const cartItems = []
const AddToCart = (ID) => {
    cartItems.push(ID)
}

const ProductCard = (props) => {
    return (
        <>
            <div className="card border-dark border-2 shadow mb-5" style={{ width: '14rem', height: '24rem' }}>
                <Link to={`product-details/${props.id}`}>
                    <img src={props.img} className="card-img-top border-bottom border-secondary shadow-sm" alt={props.name} height={"180px"} />
                </Link>
                <div className="card-body text-center">
                    <h6 className="card-title fw-bold">{props.name}</h6>
                    <h5 className="card-title">PKR <b>{props.price}</b></h5>
                    <h6 className={`card-title ${props.status === true ? "p-2" : "text-danger"}`}>{props.status ? "" : "Out of Stock"}</h6>
                    <p className="card-text">Made in {props.desc}</p>
                    <button onClick={() => AddToCart(props.id)} className="btn btn-dark">Add to Cart</button>
                </div>
            </div>
        </>
    )
}

export default ProductCard