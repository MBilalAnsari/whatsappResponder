import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Respond from "./Respond.jsx";
import Home from "./Home.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:queryId" element={<Respond />} />
      </Routes>
    </Router>
  );
}

export default App;
