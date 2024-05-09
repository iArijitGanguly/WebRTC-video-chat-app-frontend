import { createContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SocketIoClient from 'socket.io-client';

const WS_Server = 'http://localhost:5100';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SocketContext = createContext<any | null>(null);

const socket = SocketIoClient(WS_Server);

interface Props {
    children: React.ReactNode
}

export const SocketProvider: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const enterRoom = ({ roomId }: { roomId: string }) => {
      navigate(`room/${roomId}`);
    };
    socket.on('room-created', enterRoom);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <SocketContext.Provider value={{ socket }}>
      { children }
    </SocketContext.Provider>
  );
};