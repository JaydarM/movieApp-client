import './App.css';
import { useState, useEffect } from "react";
import { UserProvider } from "./context/UserContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";

import AppNavbar from "./components/AppNavbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";

function App() {

  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  })

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token) {
      const info = getUserDetails(token);

      setUser({
        id: info.id,
        isAdmin: info.isAdmin
      });
    }
  }, [user.id])

  function unsetUser() {
    localStorage.clear();
  }

  function getUserDetails(token) {
    const decodedToken = jwtDecode(token);
    return decodedToken;
  }

  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        <AppNavbar />
        <Container>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:movieId" element={<MovieDetails />} />
          </Routes>
        </Container>
      </Router>
    </UserProvider>
  )
}

export default App;
