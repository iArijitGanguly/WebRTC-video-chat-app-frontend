import { createContext } from 'react';
import SocketIoClient from 'socket.io-client';

const WS_Server = 'http://localhost:5100';

const SocketContext = createContext<unknown>(null);

const socket = SocketIoClient(WS_Server);

interface Props {
    children: React.ReactNode
}

export const SocketProvider: React.FC<Props> = ({ children }) => {
  return (
    <SocketContext.Provider value={{ socket }}>
      { children }
    </SocketContext.Provider>
  );
};