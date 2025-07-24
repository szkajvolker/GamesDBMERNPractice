import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GameCard from "../components/GameCard";

const GamePage = () => {
  const [game, setGame] = useState({});

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const res = await fetch(`http://localhost:3333/api/games/${id}`);
        if (!res.ok) {
          throw new Error("Error fetching game");
        }
        const data = await res.json();
        setGame(data);
      } catch (error) {
        console.log("Error happened", error);
      }
    };
    fetchGame();
  }, [id]);

  const handleBack = () => {
    navigate("/all");
  };
  return (
    <div>
      <GameCard game={game}></GameCard>
      <button onClick={handleBack}></button>
    </div>
  );
};

export default GamePage;
