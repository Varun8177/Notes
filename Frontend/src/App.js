import './App.css';
import { Box } from "@chakra-ui/react"
import Navbar from './pages/Navbar';
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home';
import About from './pages/About';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Notes from './pages/Notes';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

function App() {
  return (
    <Box className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/notes' element={<PrivateRoute><Notes /></PrivateRoute>} />
      </Routes>
    </Box>
  );
}

export default App;
