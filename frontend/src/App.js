
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import RoomList from './components/RoomList';
import ChatRoom from './components/ChatRoom';

function App() {
  const token = localStorage.getItem('token'); 

  return (
    <Router>
      <div>
        <h1>Real-time Chat Application</h1>
        <Routes>
          <Route path="/" element={token ? <Navigate to="/rooms" /> : <Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/rooms" element={token ? <RoomList /> : <Navigate to="/" />} />
          <Route path="/room/:id" element={token ? <ChatRoom /> : <Navigate to="/" />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
