import express from "express";
import { loginUser, registerUser } from "../Controllers/AuthController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// no use
// router.get("/", async (req, res) => {
//   res.send("Auth Route");
// });

export default router;
