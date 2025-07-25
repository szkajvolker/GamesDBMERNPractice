import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import UpdatePage from "./pages/UpdatePage";
import NavBar from "./components/NavBar";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <NavBar />
      <Toaster richColors />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/:id" element={<UpdatePage />} />
      </Routes>
    </>
  );
}

export default App;
