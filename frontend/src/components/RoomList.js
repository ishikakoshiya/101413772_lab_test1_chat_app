import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory

const RoomList = () => {
  const navigate = useNavigate();  // Use useNavigate
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // Fetch the list of rooms from the server or API
    // Example hardcoded rooms for now
    setRooms([{ id: 1, name: 'Room 1' }, { id: 2, name: 'Room 2' }]);
  }, []);

  const handleRoomClick = (roomId) => {
    navigate(`/room/${roomId}`);  // Navigate to room details
  };

  return (
    <div>
      <h2>Available Rooms</h2>
      <ul>
        {rooms.map((room) => (
          <li key={room.id} onClick={() => handleRoomClick(room.id)}>
            {room.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomList;
