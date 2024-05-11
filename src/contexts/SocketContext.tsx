import Peer from 'peerjs';
import { createContext, useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SocketIoClient from 'socket.io-client';
import { v4 as UUIdv4 } from 'uuid';

import { addPeerAction } from '../actions/peerActions';
import { peerReducer } from '../reducers/peerReducers';

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
  const [stream, setStream] = useState<MediaStream>();

  const [peers, dispatch] = useReducer(peerReducer, {});

  const fetchUserFeed = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    setStream(stream);
  };

  useEffect(() => {
    const userId = UUIdv4();
    const newPeer = new Peer(userId, {
      host: 'localhost',
      port: 9000,
      path: '/myapp'
    });
    setUser(newPeer);

    const enterRoom = ({ roomId }: { roomId: string }) => {
      navigate(`room/${roomId}`);
    };
    socket.on('room-created', enterRoom);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if(!user || !stream) return;

    socket.on('user-joined', ({ peerId }) => {
      const call = user.call(peerId, stream);
      console.log('calling to another peer', peerId);

      call.on('stream', () => {
        dispatch(addPeerAction(peerId, stream));
      });
    });

    user.on('call', (call) => {
      console.log('receiving the call');
      call.answer(stream);

      call.on('stream', () => {
        dispatch(addPeerAction(call.peer, stream));
      });
    });

    socket.emit('ready');
  }, [user, stream]);
  return (
    <SocketContext.Provider value={{ socket, user, stream, fetchUserFeed, peers }}>
      { children }
    </SocketContext.Provider>
  );
};