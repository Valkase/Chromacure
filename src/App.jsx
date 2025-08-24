import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home"
import Contact from "./pages/Contact"
import Nutrition from "./pages/Nutrition"
import About from "./pages/About"
import Research from "./pages/Research"
import ExploreResearch from "./pages/ExploreResearch"
import JoinCommunity from "./pages/JoinCommunity"
import SupportResearch from "./pages/SupportResearch"
import AccessSupport from "./pages/AccessSupport"
import ResearchCollaboration from "./pages/ResearchCollaboration"
import SupportMission from "./pages/SupportMission"
import Chat from "./components/Chat"
import "./App.css"

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/about" element={<About />} />
          <Route path="/research" element={<Research />} />
          <Route path="/explore-research" element={<ExploreResearch />} />
          <Route path="/join-community" element={<JoinCommunity />} />
          <Route path="/support-research" element={<SupportResearch />} />
          <Route path="/access-support" element={<AccessSupport />} />
          <Route path="/research-collaboration" element={<ResearchCollaboration />} />
          <Route path="/support-mission" element={<SupportMission />} />
        </Routes>
        {/* <Chat /> */}
      </div>
    </Router>
  )
}

export default App
