import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }
  },
  { _id: false }
);

const matchSchema = new mongoose.Schema(
  {
    teamA: { type: String, required: true },
    teamB: { type: String, required: true },
    matchDate: { type: Date },
    score: { type: String } // e.g. "2-1"
  },
  { _id: false }
);

const tournamentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    location: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    description: { type: String },
    isPublic: { type: Boolean, default: true },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    teams: [teamSchema],
    matches: [matchSchema]
  },
  { timestamps: true }
);

const Tournament = mongoose.model("Tournament", tournamentSchema);

export default Tournament;
