// WebSocketComponent.js
import React, { useEffect, useState } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

const WebSocketComponent = ({ onMessageReceived }) => {
  const [client, setClient] = useState(null);

  useEffect(() => {
    const wsClient = new W3CWebSocket('ws://localhost:8001/ws/chat/'); // Update WebSocket URL

    wsClient.onopen = () => {
      console.log('WebSocket Client Connected');
    };

    wsClient.onmessage = (message) => {
      const data = JSON.parse(message.data);
      onMessageReceived(data);
    };

    setClient(wsClient);

    return () => {
      wsClient.close();
    };
  }, [onMessageReceived]);

  return <div />;
};

export default WebSocketComponent;
