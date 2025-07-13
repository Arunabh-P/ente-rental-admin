import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import SingleHouse from "./pages/single-house"
import AllHouses from "./pages/all-houses"
import Dashboard from "./pages/dashboard"
import NotFound from "./components/not-found"

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/houses" element={<AllHouses />} />
        <Route path="/houses/:slug" element={<SingleHouse />} />
         <Route path="*" element={<NotFound text="Page not found" statusCode={404} backTo="/" />} />
      </Routes>
    </Router>
  )
}

export default App
