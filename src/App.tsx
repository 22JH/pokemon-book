/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Global } from "@emotion/react";
import Home from "./routes/Home";
import PokemonDetail from "./routes/PokemonDetail";

function App() {
  const globalStyle = css`
    body {
      margin: 0;
    }
  `;
  return (
    <div className="App">
      <Global styles={globalStyle} />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<PokemonDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
