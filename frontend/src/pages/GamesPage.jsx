import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdHeartDislike } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";

const GamesPage = () => {
  const [games, setGames] = useState([]);
  const [showOnlyFavs, setShowOnlyFavs] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch("http://localhost:3333/api/games/all");

        if (!res.ok) throw new Error("Failed to fetch games");

        const data = await res.json();
        //console.log(data.games);

        setGames(data.games);
      } catch (error) {
        console.error(error);
      }
    };
    fetchGames();
  }, [games.length]);

  const handleGoToEditPage = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleGoToDeletePage = (id) => {
    navigate(`/delete/${id}`);
  };
  const handleGoToDetailsPage = (id) => {
    navigate(`/game/${id}`);
  };

  const displayedGames = showOnlyFavs ? games.filter((game) => game.isFavourite === true) : games;

  const handleShowFavs = () => {
    setShowOnlyFavs(!showOnlyFavs);
  };

  return (
    <div className="flex flex-row gap-2 pt-10 justify-center">
      <button onClick={handleShowFavs}>
        {" "}
        {showOnlyFavs ? "Show all games" : "Show only fav games"}
      </button>
      {displayedGames.length === 0 ? (
        <p>No games yet.</p>
      ) : (
        <div>
          {displayedGames.map((g) => (
            <div className="border-2 border-gray-600 w-50 h-auto" key={g._id}>
              <p>Name: {g.name}</p>
              <p>Developer: {g.developer}</p>
              <p>Release Year: {g.releaseYear}</p>
              <p>Tags: {g.tags}</p>
              <p>Platform: {g.platform}</p>
              {g.isFavourite ? <IoMdHeart /> : <IoMdHeartDislike />}
              <div className="flex justify-between p-2">
                <button onClick={() => handleGoToEditPage(g._id)}>Edit</button>
                <button onClick={() => handleGoToDetailsPage(g._id)}>Details</button>
                <button onClick={() => handleGoToDeletePage(g._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GamesPage;
