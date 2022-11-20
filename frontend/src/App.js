import logo from "./logo.svg";
import "./App.css";
import { UserAuthContextProvider } from "./components/authentication/context/UserAuthContext";
import { Routes, Route } from "react-router-dom";
import Login from "./components/pages/Login";
import Registration from "./components/pages/Registration";
import ProtectedRoute from "./components/authentication/ProtectedRoute";
import Dashboard from "./components/pages/Dashboard";
import Explore from "./components/pages/Explore";
import CharityPage from "./components/pages/CharityPage";

function App() {
  return (
    <div className="App">
      <UserAuthContextProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-account"
            element={
              <ProtectedRoute>
                <Registration />
              </ProtectedRoute>
            }
          />
          <Route path="/explore" element={<Explore />} />
          <Route path="/charity" element={<CharityPage />} />
        </Routes>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
