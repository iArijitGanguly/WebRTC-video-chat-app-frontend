import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import UserFeedPlayer from '../components/UserFeedPlayer';
import { SocketContext } from '../contexts/SocketContext';

const Room: React.FC = () => {
  const { id } = useParams();
  const { socket, user, stream, fetchUserFeed, peers } = useContext(SocketContext);

  const fetchParticiapntsList = ({ roomId, participants }: { roomId: string, participants: string[] }) => {
    console.log('Fetched from participants');
    console.log(roomId, participants);
  };
  console.log('printing peers', peers);
  useEffect(() => {
    if(user) {
      fetchUserFeed();
      socket.emit('joined-room', { roomId: id, peerId: user._id });
      socket.on('get-users', fetchParticiapntsList);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, user, socket]);
  return(
    <div>
        Own stream
      <UserFeedPlayer stream={stream} />

      <div>
        Other's stream
        {
          Object.keys(peers).map((peerId) => (
            <div key={peerId}>
              <UserFeedPlayer stream={peers[peerId].stream} />
            </div>
          ))
        }
      </div>
    </div>
  ); 
};

export default Room;