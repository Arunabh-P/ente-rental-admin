import { lazy, Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProtectedRoute from "./utils/protected-route";

const SingleHouse = lazy(() => import("./pages/single-house"));
const AllHouses = lazy(() => import("./pages/all-houses"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const NotFound = lazy(() => import("./components/not-found"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/houses"
            element={
              <ProtectedRoute>
                <AllHouses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/houses/:slug"
            element={
              <ProtectedRoute>
                <SingleHouse />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={
              <NotFound text="Page not found" statusCode={404} backTo="/" />
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
