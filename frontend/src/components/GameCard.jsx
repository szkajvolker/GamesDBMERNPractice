import { useNavigate } from "react-router-dom";

const GameCard = ({ game, onDelete }) => {
  const navigate = useNavigate();
  const handleGoToEditPage = (id) => {
    navigate(`/${id}`);
  };

  const handleGoToDetailsPage = (id) => {
    navigate(`/${id}`);
  };
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-purple-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 transform hover:-translate-y-1">
      <div className="mb-4">
        <span className="text-2xl">{game.isFavourite ? "❣️" : "❌"}</span>
        <div className=" flex flex-col items-center justify-self-center">
          <h1 className="font-bold text-blue-400">Title</h1>
          <span className="text-purple-300 text-sm">{game.name}</span>
          <span className="text-purple-300 text-sm">By {game.developer}</span>
        </div>
        <div></div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="flex flex-wrap gap-1">
          {game.tags &&
            (Array.isArray(game.tags)
              ? game.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-purple-500/20 text-purple-300 text-xs px-2 py-1 rounded-full border-purple-500/30"
                  >
                    {tag}
                  </span>
                ))
              : typeof game.tags === "string"
              ? game.tags.split(",").map((tag, index) => (
                  <span
                    key={index}
                    className="bg-purple-500/20 text-purple-300 text-xs px-2 py-1 rounded-full border-purple-500/30"
                  >
                    {tag.trim()}
                  </span>
                ))
              : null)}
        </div>
        <p className="text-blue-300 text-sm">
          <span className="text-white/70">Platform:</span> {game.platform}
        </p>
        <p className="text-blue-300 text-sm">
          <span className="text-white/70">Released:</span> {game.releaseYear}
        </p>
      </div>

      <div className="flex justify-between gap-2 pt-4 border-t border-white/10">
        <button
          className="cursor-pointer text-gray-700 font-bold hover:text-orange-600"
          onClick={() => handleGoToEditPage(game._id)}
        >
          Edit
        </button>
        <button
          className="cursor-pointer text-gray-700 font-bold hover:text-orange-600"
          onClick={() => handleGoToDetailsPage(game._id)}
        >
          Details
        </button>
        <button
          className="cursor-pointer text-gray-700 font-bold hover:text-orange-600"
          onClick={() => onDelete(game._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default GameCard;
