import express from "express";
import {
    deleteAdmins,
    deleteSingleAdmin,
    getAdmins,
    getSingleAdmin,
    loginAdmin,
  registerAdmin,
} from "../controllers/adminController.js";
import { requireSignIn } from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/get-admins", requireSignIn, getAdmins);
router.get("/get-single-admin/:id", getSingleAdmin);
router.delete("/delete-single-admin/:id", deleteSingleAdmin);
router.delete("/delete-admins", deleteAdmins);

export default router;
