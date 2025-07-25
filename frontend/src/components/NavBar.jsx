import { Link } from "react-router-dom";

const NavBar = ({ showButton = true }) => {
  return (
    <div className="bg-gradient-to-r from-purple-800 to-blue-800 text-white shadow-xl top-0 sticky z-3">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <div className="text-2xl font-bold">🎮 GameDB</div>
          <div className="flex space-x-6"></div>

          <Link
            className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            to={"/"}
            showButton={showButton}
          >
            Home
          </Link>
        </div>
        <div className="flex space-x-6">
          {showButton && (
            <Link
              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              to={"/create"}
              showButton={showButton}
            >
              Add new Game
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
