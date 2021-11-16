import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Landing page Route
import LandingPage from "./pages/LandingPage/LandingPage";

function App() {
  return (
      <Router>
        <Routes>
          <Route exact path="/" element={<LandingPage/>} />
        </Routes>
      </Router>
  );
}

export default App;
