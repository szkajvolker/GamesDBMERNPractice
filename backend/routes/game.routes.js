import express from "express";
import {
  createNewGame,
  deleteGame,
  getAGame,
  getAllGames,
  updateGame,
} from "../controllers/game.controller.js";

const router = express.Router();

router.get("/", getAllGames);
router.post("/", createNewGame);
router.get("/:id", getAGame);
router.put("/:id", updateGame);
router.delete("/:id", deleteGame);

export default router;
