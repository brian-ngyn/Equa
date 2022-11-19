import logo from './logo.svg';
import './App.css';
import { UserAuthContextProvider } from "./components/authentication/context/UserAuthContext"
import { Routes, Route, } from "react-router-dom";
import Login from "./components/pages/Login"
import SignUp from "./components/pages/SignUp"
import ProtectedRoute from './components/authentication/ProtectedRoute';
import Home from './components/pages/Home';

function App() {
  return (
    <div className="App">
      <UserAuthContextProvider>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/"
            element={
            <ProtectedRoute>
              <Home/>
            </ProtectedRoute>
            } 
          />
        </Routes>
      </UserAuthContextProvider>          
    </div>
  );
}

export default App;
