import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GamePage from "./pages/GamePage";
import CreatePage from "./pages/CreatePage";
import UpdatePage from "./pages/UpdatePage";
import DeletePage from "./pages/DeletePage";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/:id" element={<GamePage />} />
        <Route path="/:id" element={<UpdatePage />} />
        <Route path="/:id" element={<DeletePage />} />
      </Routes>
    </>
  );
}

export default App;
