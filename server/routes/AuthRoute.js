import express from "express";
import {
  getUsers,
  getSingleUser,
  loginUser,
  registerUser,
  testProtect,
  deleteSingleUser,
  deleteUsers
} from "../controllers/AuthController.js";
import { requireSignIn, requireAdminPrivilege } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/get-users", requireSignIn, requireAdminPrivilege, getUsers);
router.get("/get-single-user/:id", getSingleUser);
router.delete("/delete-single-user/:id", requireSignIn, requireAdminPrivilege, deleteSingleUser);
router.delete("/delete-users", requireSignIn, requireAdminPrivilege, deleteUsers);
router.get("/test-protect", requireSignIn, testProtect);

export default router;
