import React from "react";
import MainBoard from "./components/MainBoard";
import "./components/Board.css"; // Import the styles
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="App">
      <NavBar />
      <MainBoard />
    </div>
  );
}

export default App;
