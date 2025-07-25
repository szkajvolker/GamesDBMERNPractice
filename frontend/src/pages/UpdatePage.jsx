import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UpdatePage = () => {
  const [name, setName] = useState("");
  const [releaseYear, setReleaseYear] = useState(2000);
  const [tags, setTags] = useState([""]);
  const [developer, setDeveloper] = useState("");
  const [isFavourite, setIsFavourite] = useState(false);
  const [platform, setPlatform] = useState([""]);
  const [game, setGame] = useState({});

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
    //console.log("updatebuttonclicked");

    e.preventDefault();
    const data = {
      name,
      releaseYear,
      tags,
      developer,
      isFavourite,
      platform,
    };
    try {
      const res = await fetch(`http://localhost:3333/api/games/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      //setSucces(true);
      if (!res.ok) {
        throw new Error("Failed to update game");
      }

      //console.log("updated");
    } catch (error) {
      alert("Error happened please check console");
      console.error("Failed to update", error);
    } finally {
      //console.log("updated");
      navigate("/all");
    }
  };

  //console.log(succes);
  /*   if (succes) {
    navigate("/all");
  } */

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#2c5364] to-[#1a2980] px-4 py-8">
      UpdatePage
      <div className="flex flex-col p-2">
        <p>{game.name}</p>
        <form className="border-2 p-5" onSubmit={handleUpdateGame}>
          {/**NAME */}
          <div className="border-2 m-2">
            <label htmlFor="name">Name</label>
            <input value={name} type="text" id="name" onChange={(e) => setName(e.target.value)} />
          </div>
          {/**Release Year */}
          <div className="border-2 m-2">
            <label htmlFor="releaseYear">Release Year: </label>
            <input
              value={releaseYear}
              type="text"
              id="releaseYear"
              onChange={(e) => setReleaseYear(e.target.value)}
            />
          </div>
          {/**tags */}
          <div className="border-2 m-2">
            <label htmlFor="tags">Tags</label>
            <input value={tags} type="text" id="tags" onChange={(e) => setTags(e.target.value)} />
          </div>
          {/**developer */}
          <div className="border-2 m-2">
            <label htmlFor="developer">Developer</label>
            <input
              value={developer}
              type="text"
              id="developer"
              onChange={(e) => setDeveloper(e.target.value)}
            />
          </div>
          {/**isFavourite */}
          <div className="border-2 m-2">
            <label htmlFor="isFavourite">Favourite</label>
            <input
              checked={isFavourite}
              type="checkbox"
              id="isFavourite"
              onChange={(e) => setIsFavourite(e.target.checked)}
            />
          </div>

          {/**Platform */}
          <div className="border-2 m-2">
            <label htmlFor="platform">Platform</label>
            <input
              value={platform}
              type="text"
              id="platform"
              onChange={(e) => setPlatform(e.target.value)}
            />
          </div>

          <div className="flex justify-center">
            <button
              className="border-2 border-green-300 w-fit justify-self-center cursor-pointer hover:bg-green-900"
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
