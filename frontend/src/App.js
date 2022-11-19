import logo from './logo.svg';
import './App.css';
import { UserAuthContextProvider } from "./components/authentication/context/UserAuthContext"
import { Routes, Route, } from "react-router-dom";
import Login from "./components/pages/Login"
import Registration from "./components/pages/Registration"
import ProtectedRoute from './components/authentication/ProtectedRoute';
import Dashboard from './components/pages/Dashboard';

function App() {
  return (
    <div className="App">
      <UserAuthContextProvider>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/dashboard"
            element={
            <ProtectedRoute>
              <Dashboard/>
            </ProtectedRoute>
            } 
          />
          <Route path="/create-account" element={<Registration/>}/>
        </Routes>
      </UserAuthContextProvider>          
    </div>
  );
}

export default App;
