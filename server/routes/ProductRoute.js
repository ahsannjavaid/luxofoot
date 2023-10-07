import express from "express";
import {
  addProduct,
  getProductPhoto,
  getProducts,
  getSingleProduct,
} from "../controllers/ProductController.js";

const router = express.Router();

router.get("/get-products", getProducts);
router.get("/get-single-product/:id", getSingleProduct);
router.post("/add-product", addProduct);
router.get("/get-photo/:id", getProductPhoto);

export default router;
