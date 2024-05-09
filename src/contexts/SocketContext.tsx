import Peer from 'peerjs';
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SocketIoClient from 'socket.io-client';
import { v4 as UUIdv4 } from 'uuid';

const WS_Server = 'http://localhost:5100';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SocketContext = createContext<any | null>(null);

const socket = SocketIoClient(WS_Server);

interface Props {
  children: React.ReactNode
}

export const SocketProvider: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<Peer>();

  useEffect(() => {
    const userId = UUIdv4();
    const newPeer = new Peer(userId);
    setUser(newPeer);

    const enterRoom = ({ roomId }: { roomId: string }) => {
      navigate(`room/${roomId}`);
    };
    socket.on('room-created', enterRoom);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <SocketContext.Provider value={{ socket, user }}>
      { children }
    </SocketContext.Provider>
  );
};