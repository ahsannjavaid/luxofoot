import express from "express";
import {
  getUsers,
  getSingleUser,
  loginUser,
  registerUser,
  testProtect,
  deleteSingleUser
} from "../controllers/AuthController.js";
import { requireSignIn } from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/get-users", getUsers);
router.get("/get-single-user/:id", getSingleUser);
router.delete("/delete-single-user/:id", deleteSingleUser);
router.get("/test-protect", requireSignIn, testProtect);

export default router;
