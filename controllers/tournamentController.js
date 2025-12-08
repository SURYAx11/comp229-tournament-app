import Tournament from "../models/tournamentModel.js";

// GET /api/tournaments/public
export const getPublicTournaments = async (req, res) => {
  try {
    const tournaments = await Tournament.find({ isPublic: true }).sort({
      createdAt: -1
    });
    res.json(tournaments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/tournaments  (my tournaments)
export const getMyTournaments = async (req, res) => {
  try {
    const tournaments = await Tournament.find({
      createdBy: req.user._id
    }).sort({ createdAt: -1 });
    res.json(tournaments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/tournaments/:id
export const getTournamentById = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);

    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found" });
    }

    res.json(tournament);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/tournaments
export const createTournament = async (req, res) => {
  try {
    const { name, location, startDate, endDate, description, isPublic } =
      req.body;

    const tournament = await Tournament.create({
      name,
      location,
      startDate,
      endDate,
      description,
      isPublic: isPublic ?? true,
      createdBy: req.user._id
    });

    res.status(201).json(tournament);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/tournaments/:id
export const updateTournament = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);

    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found" });
    }

    if (tournament.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    const updated = await Tournament.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE /api/tournaments/:id
export const deleteTournament = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);

    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found" });
    }

    if (tournament.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await tournament.deleteOne();
    res.json({ message: "Tournament deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// PATCH /api/tournaments/:id/teams
export const addTeams = async (req, res) => {
  try {
    const { teams } = req.body;

    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found" });
    }

    if (tournament.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    tournament.teams.push(...teams);
    await tournament.save();

    res.json(tournament);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// PATCH /api/tournaments/:id/matches
export const addMatches = async (req, res) => {
  try {
    const { matches } = req.body;

    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found" });
    }

    if (tournament.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    tournament.matches.push(...matches);
    await tournament.save();

    res.json(tournament);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
