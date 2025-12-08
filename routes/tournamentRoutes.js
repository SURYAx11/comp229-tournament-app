import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getPublicTournaments,
  getMyTournaments,
  getTournamentById,
  createTournament,
  updateTournament,
  deleteTournament,
  addTeams,
  addMatches
} from "../controllers/tournamentController.js";

const router = express.Router();

// public route
router.get("/public", getPublicTournaments);

// from here on, user must be logged in
router.use(authMiddleware);

router.get("/", getMyTournaments);
router.get("/:id", getTournamentById);
router.post("/", createTournament);
router.put("/:id", updateTournament);
router.delete("/:id", deleteTournament);
router.patch("/:id/teams", addTeams);
router.patch("/:id/matches", addMatches);

export default router;
