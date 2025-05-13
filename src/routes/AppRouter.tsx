import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import Sports from "../pages/Sports"
import SportDetail from "../pages/SportDetail"
import MatchDetail from "../pages/MatchDetail"

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/esportes" element={<Sports />} />
        <Route path="/esportes/:sport" element={<SportDetail />} />
        <Route path="/partida/:id" element={<MatchDetail />} />
      </Routes>
    </Router>
  )
}
