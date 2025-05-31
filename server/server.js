import express from "express";
import formidableMiddleware from 'express-formidable';
import cors from "cors";
import homeRoute from "./routes/HomeRoute.js";
import authRoute from "./routes/AuthRoute.js";
import adminRoute from "./routes/adminRoute.js";
import productRoute from "./routes/ProductRoute.js";
import categoryRoute from "./routes/CategoryRoute.js";
import "./database/config.js";

const app = express();
const PORT = 5000;

// form-data middleware
app.use(formidableMiddleware());

// cors
app.use(cors());

// APIs
app.use("/api/v1", homeRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/category", categoryRoute);

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}.`);
});
