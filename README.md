# GameDB Frontend

A modern, full-stack MERN (MongoDB, Express, React, Node.js) application for managing your personal game collection. This is the frontend (React + Vite + TailwindCSS) part of the project.

## 🚀 Features

- Add, update, and delete games
- Mark games as favourite
- Tag games with genres or keywords
- Sort and filter games by release year
- Responsive, modern UI with TailwindCSS
- Toast notifications for user feedback
- Sticky navigation bar
- Fast development with Vite

## 🛠️ Tech Stack

- **React 19**
- **Vite**
- **TailwindCSS**
- **React Router DOM**
- **Sonner** (toast notifications)
- **React Icons**

## 📦 Installation & Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/szkajvolker/GamesDBMERNPractice.git
   cd GamesDBMERNPractice/frontend
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Start the development server:**
   ```sh
   npm run dev
   ```
4. The app will be available at [http://localhost:5173](http://localhost:5173) by default.

> ⚠️ The backend must also be running for full functionality. See the backend folder for setup instructions.

## 📁 Project Structure

- `src/pages` — Main pages (Home, Create, Update)
- `src/components` — Reusable UI components (NavBar, GameCard, etc.)
- `src/assets` — Static assets

## 🌟 Usage

- **Home:** View all games, sort, and see favourites
- **Add new game:** Fill out the form to add a new game
- **Edit game:** Click a game card to update its details
- **Delete game:** Remove a game from your collection

## 📱 Screenshoots and code parts

```js
export const createNewGame = async (req, res) => {
  try {
    if (!req.body.name || !req.body.developer || !req.body.platform || !req.body.releaseYear) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }
    const newGame = req.body;
    console.log(newGame);
    const game = await Game.create(newGame);
    res.status(201).json({ message: "Successfully created game", game });
  } catch (error) {
    console.error("Error creating game:", error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};
```

![Create](/post.png)
