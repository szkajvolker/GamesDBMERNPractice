import Game from "../models/game.model.js";

//create new --> POST
export const createNewGame = async (req, res) => {
  try {
    if (!req.body.name || !req.body.developer || !req.body.platform || !req.body.releaseYear) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }
    const newGame = req.body;
    console.log(newGame);
    const game = await Game.create(newGame);
    res.status(201).json({ message: "Successfully created game", game });
  } catch (error) {
    console.error("Error creating game:", error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

//get all from db --> GET
export const getAllGames = async (req, res) => {
  try {
    const games = await Game.find({});
    if (games.length === 0) {
      return res.status(404).json({ message: "No games yet" });
    }
    res.status(200).json({ message: "All games successfully fetched", games });
  } catch (error) {
    console.error("Error fetching games:", error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

//update --> PUT

export const updateGame = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.body.name || !req.body.developer || !req.body.platform || !req.body.releaseYear) {
      return res.status(400).json({ message: "Please send all required fields" });
    }
    //console.log("ID:", id);
    const updatedGame = await Game.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedGame) {
      return res.status(404).json({ message: "Game not found in db check ID" });
    }
    res.status(200).json({ message: "Game updated successfully", updatedGame });
  } catch (error) {
    console.error("Error updating game:", error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

//delete from db -->DELETE

export const deleteGame = async (req, res) => {
  const { id } = req.params;
  //console.log(id);
  try {
    const deletedGame = await Game.findByIdAndDelete(id);
    if (!deletedGame) {
      return res.status(404).json({ message: "Game not found in db check ID" });
    }
    res.status(200).json({ message: "Game successfully deleted from db!", deletedGame });
  } catch (error) {
    console.error("Error deleting game:", error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

//get a single game by id //GET

export const getAGame = async (req, res) => {
  const { id } = req.params;
  try {
    const foundGame = await Game.findById(id);
    if (!foundGame) {
      return res.status(404).json({ message: "Game not found invalid ID" });
    }
    res.status(200).json({ message: "Game found", foundGame });
  } catch (error) {
    console.error("Error finding game:", error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};
