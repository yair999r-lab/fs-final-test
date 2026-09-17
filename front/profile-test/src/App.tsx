import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Sigup from "./pages/Sigup";
import Profile from "./pages/Profile";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sigup" element={<Sigup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
