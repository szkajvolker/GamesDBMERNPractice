import { useNavigate } from "react-router-dom";
import GameCard from "../components/GameCard";

const DeletePage = () => {
  //const [succes, setSucces] = useState(false);

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3333/api/games/delete/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete game");
      }
      //setSucces(true);
    } catch (error) {
      alert("Error happened please check console");
      console.error("Failed to delete game", error);
    } finally {
      navigate("/all");
    }
  };

  return (
    <div>
      DeletePage
      <div>
        <GameCard />
      </div>
    </div>
  );
};

export default DeletePage;
