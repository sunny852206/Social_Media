import express from "express";
import { registerUser } from "../Controllers/AuthController.js";

const router = express.Router();

router.post("/register", registerUser);

// no use
// router.get("/", async (req, res) => {
//   res.send("Auth Route");
// });

export default router;
