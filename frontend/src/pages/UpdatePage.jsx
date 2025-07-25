import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Loading from "../components/Loading";

const UpdatePage = () => {
  const [name, setName] = useState("");
  const [releaseYear, setReleaseYear] = useState(2000);
  const [tags, setTags] = useState([""]);
  const [developer, setDeveloper] = useState("");
  const [isFavourite, setIsFavourite] = useState(false);
  const [platform, setPlatform] = useState([""]);
  const [game, setGame] = useState({});
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const res = await fetch(`http://localhost:3333/api/games/${id}`);
        if (!res.ok) {
          throw new Error("Error fetching game");
        }
        const data = await res.json();

        setGame(data.foundGame);
        setName(data.foundGame.name);
        setTags(data.foundGame.tags);
        setDeveloper(data.foundGame.developer);
        setIsFavourite(data.foundGame.isFavourite);
        setPlatform(data.foundGame.platform);
      } catch (error) {
        console.error(error);
      }
    };
    fetchGame();
  }, [id]);

  const handleUpdateGame = async (e) => {
    e.preventDefault();
    const data = {
      name,
      releaseYear,
      tags,
      developer,
      isFavourite,
      platform,
    };
    if (!name || !releaseYear || !developer || !platform) {
      toast.error("Please fill all required fields!");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:3333/api/games/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        throw new Error("Failed to update game");
      }
      toast.success("Updated successfully!");
    } catch (error) {
      alert("Error happened please check console");
      console.error("Failed to update", error);
    } finally {
      setLoading(false);
      navigate("/");
    }
  };

  if (loading)
    return (
      <>
        <Loading />
      </>
    );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#2c5364] to-[#1a2980] px-4 py-8">
      <h1 className="text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 drop-shadow-[0_0_10px_#00ffea] tracking-wide animate-pulse">
        Update Game
      </h1>
      <div className="flex flex-col p-6 rounded-2xl bg-white/10 backdrop-blur-lg shadow-2xl boder-4 border-[#00ffea] max-w-lg w-full">
        <p className="text-2xl font-bold text-green-400 mb-4 text-center drop-shadow-[0_0_6px_#00ffea]">
          {game.name}
        </p>
        <form className="space-y-6" onSubmit={handleUpdateGame}>
          {/**NAME */}
          <div className="flex flex-col mb-2">
            <label className="text-lg font-semibold text-purple-300 mb-1" htmlFor="name">
              Name
            </label>
            <input
              className="px-3 py-2 rounded-lg bg-[#181c2f] text-green-300 border-2 border-purple-500 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200"
              value={name}
              type="text"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          {/**Release Year */}
          <div className="flex flex-col mb-2">
            <label className="text-lg font-semibold text-purple-300 mb-1" htmlFor="releaseYear">
              Release Year:{" "}
            </label>
            <input
              className="px-3 py-2 rounded-lg bg-[#181c2f] text-green-300 border-2 border-purple-500 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200"
              value={releaseYear}
              type="text"
              id="releaseYear"
              onChange={(e) => setReleaseYear(e.target.value)}
            />
          </div>
          {/**tags */}
          <div className="flex flex-col mb-2">
            <label className="text-lg font-semibold text-purple-300 mb-1" htmlFor="tags">
              Tags
            </label>
            <input
              className="px-3 py-2 rounded-lg bg-[#181c2f] text-green-300 border-2 border-purple-500 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200"
              value={tags}
              type="text"
              id="tags"
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
          {/**developer */}
          <div className="flex flex-col mb-2">
            <label className="text-lg font-semibold text-purple-300 mb-1" htmlFor="developer">
              Developer
            </label>
            <input
              className="px-3 py-2 rounded-lg bg-[#181c2f] text-green-300 border-2 border-purple-500 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200"
              value={developer}
              type="text"
              id="developer"
              onChange={(e) => setDeveloper(e.target.value)}
            />
          </div>
          {/**isFavourite */}
          <div className="flex items-center mb-2">
            <label className="text-lg font-semibold text-purple-300 mb-1" htmlFor="isFavourite">
              Favourite
            </label>
            <input
              className="accent-green-400 w-5 h-5"
              checked={isFavourite}
              type="checkbox"
              id="isFavourite"
              onChange={(e) => setIsFavourite(e.target.checked)}
            />
          </div>

          {/**Platform */}
          <div className="flex flex-col mb-2">
            <label className="text-lg font-semibold text-purple-300 mb-1" htmlFor="platform">
              Platform
            </label>
            <input
              className="px-3 py-2 rounded-lg bg-[#181c2f] text-green-300 border-2 border-purple-500 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200"
              value={platform}
              type="text"
              id="platform"
              onChange={(e) => setPlatform(e.target.value)}
            />
          </div>

          <div className="flex justify-center mt-6">
            <button
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-black font-bold text-xl border-2 border-[#00ffea] shadow-lg hover:shadow-[0_0_20px_#00ffea] transition-all duration-200 cursor-pointer tracking-wider"
              type="submit"
            >
              Update game
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePage;
