import express from "express";
import { addCategory } from "../controllers/CategoryController.js";

const router = express.Router();

router.post("/add-category", addCategory);

export default router;
