import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 

const RoomList = () => {
  const navigate = useNavigate();  
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    
    setRooms([{ id: 1, name: 'Room 1' }, { id: 2, name: 'Room 2' }]);
  }, []);

  const handleRoomClick = (roomId) => {
    navigate(`/room/${roomId}`);  
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
