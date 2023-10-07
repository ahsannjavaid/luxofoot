import express from "express";
import formidableMiddleware from 'express-formidable';
import cors from "cors";
import HomeRoute from "./routes/HomeRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import CategoryRoute from "./routes/CategoryRoute.js";
import "./database/config.js";

const app = express();
const PORT = 5000;

// form-data middleware
app.use(formidableMiddleware());

// cors
app.use(cors());

// APIs
app.use("/api/v1", HomeRoute);
app.use("/api/v1/auth", AuthRoute);
app.use("/api/v1/product", ProductRoute);
app.use("/api/v1/category", CategoryRoute);

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}.`);
});
