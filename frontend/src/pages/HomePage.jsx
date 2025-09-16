import { useEffect } from "react";
import { useState } from "react";
import GameCard from "../components/GameCard";
import { toast } from "sonner";
import Loading from "../components/Loading";

const HomePage = () => {
  const [games, setGames] = useState([]);
  const [filterByYear, setFilterByYear] = useState("asc");
  const [initialLoading, setInitialLoading] = useState(true);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3333/api/games/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete game");
      }
      toast.success("Successfully deleted!");
      setGames(games.filter((game) => game._id !== id));
    } catch (error) {
      alert("Error happened please check console");
      console.error("Failed to delete game", error);
    }
  };

  const handleSort = () => {
    if (filterByYear === "asc") {
      setFilterByYear("desc");
    } else {
      setFilterByYear("asc");
    }
  };

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setInitialLoading(true);
        const res = await fetch("http://localhost:3333/api/games");
        if (!res.ok) {
          throw new Error("Failed to fetch games");
        }
        const data = await res.json();
        setGames(data.games);
      } catch (error) {
        console.error(error);
      } finally {
        setInitialLoading(false);
      }
    };
    fetchGames();
  }, []);

  const likedGames = games.filter((game) => game.isFavourite === true);

  const filteredByReleaseYear =
    filterByYear === "asc"
      ? games.sort((a, b) => a.releaseYear - b.releaseYear)
      : games.sort((a, b) => b.releaseYear - a.releaseYear);

  if (initialLoading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <Loading />
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              GameDB
            </span>
          </h1>
          <p className="text-purple-300 text-lg">Your Gaming Collection</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-white">{games.length}</div>
            <div className="text-purple-300">Total Games</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-white">{likedGames.length}</div>
            <div className="text-purple-300">Favourites</div>
          </div>
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="text-3xl font-bold text-pink-400 mb-8 flex items-center">All Games</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {games.length === 0
                ? "No games yet."
                : games.map((game) => (
                    <GameCard key={game._id} game={game} onDelete={handleDelete} />
                  ))}
            </div>
          </section>
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="text-3xl font-bold text-pink-400 mb-8 flex items-center">
              Favourite Games
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {likedGames.length === 0
                ? "No favourite games yet."
                : likedGames.map((game) => (
                    <GameCard key={game._id} game={game} onDelete={handleDelete} />
                  ))}
            </div>
          </section>
        </div>
        <div className="flex w-full items-center justify-center">
          <button
            className="cursor-pointer bg-gray-700 p-2 m-2 rounded-lg hover:bg-gray-500"
            onClick={handleSort}
          >
            <h2 className="text-purple-300">
              {filterByYear === "asc" ? "Sort by ascending year" : "Sort by descending year"}
            </h2>
          </button>
        </div>

        <section className="grid grid-cols-6 gap-2">
          {filteredByReleaseYear.map((game) => (
            <GameCard key={game._id} game={game} onDelete={handleDelete} />
          ))}
        </section>
      </div>
    </div>
  );
};

export default HomePage;
