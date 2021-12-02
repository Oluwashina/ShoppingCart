import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CartPage from "./pages/Cart/cart";

// Login page Route
import LoginPage from "./pages/Login/Login";

function App() {
  return (
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginPage/>} />
          <Route path="/cart" element={<CartPage/>} />
        </Routes>
      </Router>
  );
}

export default App;
