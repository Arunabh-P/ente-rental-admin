import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import SingleHouse from "./pages/single-house"
import AllHouses from "./pages/all-houses"
import Dashboard from "./pages/dashboard"

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/houses" element={<AllHouses />} />
        <Route path="/houses/:slug" element={<SingleHouse />} />
      </Routes>
    </Router>
  )
}

export default App
