import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import NodeState from './Context/Notes/NotesState';
import MyAlert from './Components/MyAlert';
import Login from './Components/Login';
import SignUp from './Components/SignUp';

function App() {
  localStorage.setItem('token','');
  return (
    <>
    <NodeState>
      <Router>
        <Navbar title="iNotebook" />
        <MyAlert title = "Item Deleted" />
        <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        </div>
      </Router>
      </NodeState>
    </>
  )
}

export default App;
