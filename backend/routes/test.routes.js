import express from "express";
import { testConnection } from "../controllers/test.controller.js";

const router = express.Router();

router.get("/", testConnection);
export default router;
