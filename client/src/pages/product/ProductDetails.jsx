import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import LoadingSpinner from "../../components/loading-spinner/LoadingSpinner";
import { fetchData } from "../../helper/product";
import BackButton from "../../components/button/BackButton";

const ProductDetails = () => {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  // const [selectedSize, setSelectedSize] = useState("M");
  // const [selectedColor, setSelectedColor] = useState("midnight");
  // const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    fetchData(setProductDetails, setIsLoading, 1, id);
    // eslint-disable-next-line
  }, [id]);

  // Sample product data
  // const product = {
  //   name: "Premium Wireless Headphones",
  //   price: 299.99,
  //   originalPrice: 399.99,
  //   rating: 4.8,
  //   reviews: 2847,
  //   description:
  //     "Experience crystal-clear audio with our premium wireless headphones featuring active noise cancellation, 30-hour battery life, and studio-grade sound quality. Perfect for music lovers, professionals, and anyone who values exceptional audio quality.",
  //   features: [
  //     "Active Noise Cancellation Technology",
  //     "30-hour battery life with quick charge",
  //     "Premium leather cushions for comfort",
  //     "Bluetooth 5.2 connectivity",
  //     "Studio-grade sound quality",
  //   ],
  //   images: [
  //     "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
  //     "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop",
  //     "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=500&h=500&fit=crop",
  //     "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=500&fit=crop",
  //   ],
  //   sizes: ["S", "M", "L", "XL"],
  //   colors: [
  //     { name: "midnight", value: "#1a1a2e", label: "Midnight Black" },
  //     { name: "silver", value: "#c0c0c0", label: "Silver" },
  //     { name: "rose", value: "#e8b4b8", label: "Rose Gold" },
  //     { name: "navy", value: "#16213e", label: "Navy Blue" },
  //   ],
  // };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % productDetails.images.length);
  };

  const prevImage = () => {
    setSelectedImage(
      (prev) =>
        (prev - 1 + productDetails.images.length) % productDetails.images.length
    );
  };

  const handleQuantityChange = (change) => {
    setQuantity(Math.max(1, quantity + change));
  };

  // const renderStars = (rating) => {
  //   const stars = [];
  //   for (let i = 1; i <= 5; i++) {
  //     stars.push(
  //       <i
  //         key={i}
  //         className={`fas fa-star ${
  //           i <= Math.floor(rating) ? "text-warning" : "text-muted"
  //         } me-1`}
  //       />
  //     );
  //   }
  //   return stars;
  // };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Layout>
      <>
        <div className="container">
          {/* Header Navigation */}
          <div className="py-4">
            <BackButton />
          </div>

          {/* Main Product Card */}
          <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
            <div className="row g-0">
              {/* Image Gallery Section */}
              <div className="col-lg-6">
                <div className="bg-white p-4 p-lg-5 h-100">
                  {/* Main Image */}
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: "1 / 1",
                      borderRadius: "12px",
                      overflow: "hidden",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                      marginBottom: "1rem",
                    }}
                  >
                    <img
                      src={productDetails.images[selectedImage]}
                      alt={productDetails.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />

                    {/* Left Arrow */}
                    <button
                      onClick={prevImage}
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "10px",
                        transform: "translateY(-50%)",
                        width: "45px",
                        height: "45px",
                        borderRadius: "50%",
                        backgroundColor: "white",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 2,
                      }}
                    >
                      <i className="fas fa-chevron-left"></i>
                    </button>

                    {/* Right Arrow */}
                    <button
                      onClick={nextImage}
                      style={{
                        position: "absolute",
                        top: "50%",
                        right: "10px",
                        transform: "translateY(-50%)",
                        width: "45px",
                        height: "45px",
                        borderRadius: "50%",
                        backgroundColor: "white",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 2,
                      }}
                    >
                      <i className="fas fa-chevron-right"></i>
                    </button>
                  </div>

                  {/* Thumbnail Gallery */}
                  <div className="d-flex justify-content-center gap-3">
                    {productDetails.images.map((image, index) => (
                      <button
                        key={index}
                        className={`btn p-0 rounded-3 overflow-hidden ${
                          selectedImage === index
                            ? "border border-3 border-primary shadow"
                            : "border border-2"
                        }`}
                        style={{ width: "70px" }}
                        onClick={() => setSelectedImage(index)}
                      >
                        <img
                          src={image}
                          alt=""
                          className="w-100 h-100 object-fit-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Product Information Section */}
              <div className="col-lg-6">
                <div className="p-4 p-lg-5 h-100">
                  {/* Product Header */}
                  {/* <div className="d-flex justify-content-between align-items-start mb-4">
                    <span
                      className="badge bg-gradient text-white px-3 py-2 rounded-pill fs-6"
                      style={{
                        background: "linear-gradient(45deg, #007bff, #6f42c1)",
                      }}
                    >
                      <i className="fas fa-fire me-2"></i>Best Seller
                    </span>
                    <button
                      className={`btn rounded-circle ${
                        isWishlisted ? "btn-danger" : "btn-outline-secondary"
                      }`}
                      style={{ width: "50px", height: "50px" }}
                      onClick={() => setIsWishlisted(!isWishlisted)}
                    >
                      <i
                        className={`${isWishlisted ? "fas" : "far"} fa-heart`}
                      ></i>
                    </button>
                  </div> */}

                  {/* Product Title */}
                  <h1 className="display-6 fw-bold text-dark mb-3">
                    {productDetails.name}
                  </h1>

                  {/* Rating */}
                  {/* <div className="d-flex align-items-center mb-4">
                    <div className="me-3">{renderStars(product.rating)}</div>
                    <span className="fs-5 fw-semibold me-3 text-dark">
                      {product.rating}
                    </span>
                    <span className="text-muted">
                      ({product.reviews.toLocaleString()} reviews)
                    </span>
                  </div> */}

                  {/* Price Section */}
                  <div className="d-flex align-items-center flex-wrap gap-3 mb-5">
                    <span className="display-5 fw-bold">
                      Rs.{productDetails.price}
                    </span>
                    {/* <span className="fs-4 text-muted text-decoration-line-through">
                      ${product.originalPrice}
                    </span>
                    <span className="badge bg-success fs-6 px-3 py-2 rounded-pill">
                      Save 25%
                    </span> */}
                  </div>

                  {/* Color Selection */}
                  {/* <div className="mb-4">
                    <h5 className="fw-semibold mb-3 text-dark">Color</h5>
                    <div className="d-flex gap-3">
                      {product.colors.map((color) => (
                        <button
                          key={color.name}
                          className={`btn rounded-circle border-3 ${
                            selectedColor === color.name
                              ? "border-primary shadow"
                              : "border-secondary"
                          }`}
                          style={{
                            backgroundColor: color.value,
                            width: "50px",
                            height: "50px",
                          }}
                          onClick={() => setSelectedColor(color.name)}
                          title={color.label}
                        />
                      ))}
                    </div>
                  </div> */}

                  {/* Size Selection */}
                  {/* <div className="mb-4">
                    <h5 className="fw-semibold mb-3 text-dark">Size</h5>
                    <div className="d-flex gap-2 flex-wrap">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          className={`btn px-4 py-2 fw-semibold ${
                            selectedSize === size
                              ? "btn-primary"
                              : "btn-outline-secondary"
                          }`}
                          onClick={() => setSelectedSize(size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div> */}

                  {/* Quantity Selector */}
                  <div className="mb-5">
                    <h5 className="fw-semibold mb-3 text-dark">Quantity</h5>
                    <div className="d-flex align-items-center">
                      <div
                        className="input-group"
                        style={{ width: "fit-content" }}
                      >
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() => handleQuantityChange(-1)}
                          disabled={quantity <= 1}
                        >
                          <i className="fas fa-minus"></i>
                        </button>
                        <input
                          type="text"
                          className="form-control text-center fw-semibold"
                          value={quantity}
                          readOnly
                          style={{ width: "80px" }}
                        />
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() => handleQuantityChange(1)}
                        >
                          <i className="fas fa-plus"></i>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mb-5">
                    <button className="btn btn-primary btn-lg w-100 mb-3 py-3 fw-semibold rounded-3">
                      <i className="fas fa-shopping-cart me-2"></i>
                      Add to Cart - Rs.{productDetails.price * quantity}
                    </button>

                    <div className="row g-2">
                      <div className="col-9">
                        <button className="btn btn-dark btn-lg w-100 py-3 fw-semibold rounded-3">
                          <i className="fas fa-bolt me-2"></i>
                          Buy Now
                        </button>
                      </div>
                      <div className="col-3">
                        <button className="btn btn-outline-secondary btn-lg w-100 py-3 rounded-3">
                          <i className="fas fa-share-alt"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Description */}
          <div className="card mt-4 shadow border-0 rounded-4">
            <div className="card-body p-4 p-lg-5">
              <h2 className="h3 fw-bold mb-4 text-dark">Product Description</h2>
              <p className="fs-5 text-muted lh-lg mb-0">
                {productDetails.description}
              </p>
            </div>
          </div>
        </div>
      </>
    </Layout>
  );
};

export default ProductDetails;
