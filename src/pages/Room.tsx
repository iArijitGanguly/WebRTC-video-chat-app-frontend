import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { SocketContext } from '../contexts/SocketContext';

const Room: React.FC = () => {
  const { id } = useParams();
  const { socket, user } = useContext(SocketContext);

  const fetchParticiapntsList = ({ roomId, participants }: { roomId: string, participants: string[] }) => {
    console.log('Fetched from participants');
    console.log(roomId, participants);
  };

  useEffect(() => {
    if(user) {
      socket.emit('joined-room', { roomId: id, peerId: user._id });
      socket.on('get-users', fetchParticiapntsList);
    }
  }, [id, user, socket]);
  return(
    <div>
        room: {id}
    </div>
  ); 
};

export default Room;