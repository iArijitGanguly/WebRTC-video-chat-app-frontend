import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { SocketContext } from '../contexts/SocketContext';

const Room: React.FC = () => {
  const { id } = useParams();
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.emit('joined-room', { roomId: id });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return(
    <div>
        room: {id}
    </div>
  ); 
};

export default Room;