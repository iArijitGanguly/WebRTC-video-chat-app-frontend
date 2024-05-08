import './index.css';

import ReactDOM from 'react-dom/client';

import App from './App';
import { SocketProvider } from './contexts/SocketContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <SocketProvider>
    <App />
  </SocketProvider>
);
