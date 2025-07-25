import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Loading from "../components/Loading";

const CreatePage = () => {
  const [name, setName] = useState("");
  const [releaseYear, setReleaseYear] = useState(2000);
  const [tags, setTags] = useState([]);
  const [developer, setDeveloper] = useState("");
  const [isFavourite, setIsFavourite] = useState(false);
  const [platform, setPlatform] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleCreateGame = async (e) => {
    e.preventDefault();

    if (!name || !developer || !platform || !releaseYear) {
      toast.error("Please fill all required fields!");
      return;
    }
    const data = {
      name,
      releaseYear: Number(releaseYear),
      tags,
      developer,
      isFavourite,
      platform,
    };

    try {
      setLoading(true);
      const res = await fetch("http://localhost:3333/api/games", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        throw new Error("Failed to create new game");
      }
      toast.success("Your new game successfully added!");
    } catch (error) {
      alert("Error happened please check console");
      console.error("Failed to create game", error);
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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-12 px-4">
      <div className="max-w-lg mx-auto bg-black/20 backdrop-blur-sm rounded-2xl border border-purple-500/30 p-8 ">
        <h2 className="text-4xl font-bold text-white text-center mb-8">
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Add Game
          </span>
        </h2>

        <form className="" onSubmit={handleCreateGame}>
          {/**NAME */}
          <div className="space-y-6">
            <label className="block text-purple-300 font-semibold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="w-full px-4 py-3 bg-white/10 border-2 border-purple-500/50 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
              placeholder="Enter game name..."
              value={name}
              type="text"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          {/**Release Year */}
          <div className="space-y-6">
            <label className="block text-purple-300 font-semibold mb-2" htmlFor="releaseYear">
              Release Year:{" "}
            </label>
            <input
              value={releaseYear}
              className="w-full px-4 py-3 bg-white/10 border-2 border-purple-500/50 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
              type="text"
              id="releaseYear"
              onChange={(e) => setReleaseYear(e.target.value)}
            />
          </div>
          {/**tags */}
          <div className="space-y-6">
            <label className="block text-purple-300 font-semibold mb-2" htmlFor="tags">
              Tags
            </label>
            <input
              value={tags.join(", ")}
              className="w-full px-4 py-3 bg-white/10 border-2 border-purple-500/50 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
              type="text"
              placeholder="action, adventure,rpg"
              id="tags"
              onChange={(e) => setTags(e.target.value.split(",").map((tag) => tag.trim()))}
            />
          </div>
          {/**developer */}
          <div className="space-y-6">
            <label className="block text-purple-300 font-semibold mb-2" htmlFor="developer">
              Developer
            </label>
            <input
              value={developer}
              className="w-full px-4 py-3 bg-white/10 border-2 border-purple-500/50 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
              type="text"
              placeholder="Enter developer"
              id="developer"
              onChange={(e) => setDeveloper(e.target.value)}
            />
          </div>
          {/**isFavourite */}
          <div className="space-y-6">
            <label className="block text-purple-300 font-semibold mb-2" htmlFor="isFavourite">
              Favourite
            </label>
            <input
              checked={isFavourite}
              type="checkbox"
              id="isFavourite"
              onChange={(e) => setIsFavourite(e.target.checked)}
            />
          </div>

          {/**Platform */}
          <div className="space-y-6">
            <label className="block text-purple-300 font-semibold mb-2" htmlFor="platform">
              Platform
            </label>
            <select
              value={platform}
              className="custom-dropdown w-full px-4 py-3 border-2 border-purple-500/50 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
              id="platform"
              onChange={(e) => setPlatform(e.target.value)}
            >
              <option value="">Select Platform</option>
              <option value="PC">PC</option>
              <option value="Xbox">Xbox</option>
              <option value="PlayStation">PlayStation</option>
              <option value="Nintendo Switch">Nintendo Switch</option>
              <option value="Mobile">Mobile</option>
            </select>
          </div>

          <div className="flex justify-center">
            <button
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-105 mt-5"
              type="submit"
            >
              ✨ Create Epic Game
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePage;
