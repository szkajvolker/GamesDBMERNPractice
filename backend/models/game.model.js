import mongoose from "mongoose";

const gameSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    developer: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
    },
    platform: {
      type: String,
      enum: ["PC", "Xbox", "PlayStation", "Nintendo Switch", "Mobile"],
      default: ["PC"],
      required: true,
    },
    releaseYear: {
      type: Number,
      required: true,
    },
    isFavourite: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("game", gameSchema);
