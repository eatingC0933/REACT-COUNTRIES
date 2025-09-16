import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import CountryDetail from "./pages/CountryDetail";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";
import "./App.css";


export default function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <header className="header">
          <h1>Countries</h1>
          <nav className="nav">
            <a href="/">Overview</a>
            <a href="/favorites">Favorites</a>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/item/:id" element={<CountryDetail />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
