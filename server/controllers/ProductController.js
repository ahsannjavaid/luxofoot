import slugify from "slugify";
import ProductSchema from "../models/productSchema.js";
import fs from "fs";

export const addProduct = async (req, res) => {
  try {
    const { name, price, description, category, quantity, isAvailable } =
      req.fields;
    const { photo } = req.files;
    // validation
    switch (true) {
      case !name:
        return res
          .status(206)
          .send({ success: false, message: "Please provide 'name' field." });
      case !price:
        return res
          .status(206)
          .send({ success: false, message: "Please provide 'price' field." });
      case !description:
        return res.status(206).send({
          success: false,
          message: "Please provide 'description' field.",
        });
      case quantity === null || quantity === "":
        return res.status(206).send({
          success: false,
          message: "Please provide 'quantity' field.",
        });
      case !category:
        return res.status(206).send({
          success: false,
          message: "Please provide 'category' field.",
        });
      case isAvailable === null || isAvailable === "":
        return res.status(206).send({
          success: false,
          message: "Please provide 'isAvailable' field.",
        });
      case photo && photo.size > 1000000:
        return res.status(413).send({
          success: false,
          message: "Image size exceeds the maximum allowed size.",
        });
      default:
        break;
    }
    const product = new ProductSchema({ ...req.fields, slug: slugify(name) });
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res
      .status(201)
      .send({
        success: true,
        message: "Product added successfully!",
        data: product,
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({
        success: false,
        message: "Something went wrong while adding product!",
        error,
      });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await ProductSchema.find()
      .populate("category")
      .select("-photo")
      .sort({ createdAt: -1 });
    if (products.length) {
      res.status(200).send({
        success: true,
        message: "Products fetched successfully!",
        count: products.length,
        data: products,
      });
    } else {
      res.status(404).send({ success: false, message: "Products not found!" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({
        success: false,
        message: "Something went wrong while getting products!",
        error,
      });
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const product = await ProductSchema.findById({ _id: req.params.id })
      .populate("category")
      .select("-photo");
    if (product) {
      res.status(200).send({
        success: true,
        message: "Product fetched successfully!",
        data: product,
      });
    } else {
      res.status(404).send({ success: false, message: "Product not found!" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({
        success: false,
        message: "Something went wrong while getting product!",
        error,
      });
  }
};

export const getProductPhoto = async (req, res) => {
  try {
    const photo = await ProductSchema.findById(req.params.id).select("photo");
    if (photo.photo.data) {
      res.set("Content-Type", photo.photo.contentType);
      return res
        .status(200)
        .send(photo.photo.data);
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({
        success: false,
        message: "Something went wrong while getting image!",
        error,
      });
  }
};
