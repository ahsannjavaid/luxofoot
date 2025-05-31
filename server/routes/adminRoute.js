import express from "express";
import {
    deleteAdmins,
    deleteSingleAdmin,
    getAdmins,
    getSingleAdmin,
    loginAdmin,
  registerAdmin,
} from "../controllers/adminController.js";
import { requireAdminPrivilege, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", requireSignIn, requireAdminPrivilege, registerAdmin);
router.post("/login", loginAdmin);
router.get("/get-admins", requireSignIn, requireAdminPrivilege, getAdmins);
router.get("/get-single-admin/:id", requireSignIn, requireAdminPrivilege, getSingleAdmin);
router.delete("/delete-single-admin/:id", requireSignIn, requireAdminPrivilege, deleteSingleAdmin);
router.delete("/delete-admins", requireSignIn, requireAdminPrivilege, deleteAdmins);

export default router;
