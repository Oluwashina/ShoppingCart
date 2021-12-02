import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Login page Route
import LoginPage from "./pages/Login/Login";

function App() {
  return (
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginPage/>} />
        </Routes>
      </Router>
  );
}

export default App;
