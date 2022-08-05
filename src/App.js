import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AuthContextProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from './pages/Login.jsx'
import SignUp from './pages/Signup.jsx'
import Account from './pages/Account.jsx'
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div>
      <AuthContextProvider> 
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/account" element={<ProtectedRoute> <Account /> </ProtectedRoute> } />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
