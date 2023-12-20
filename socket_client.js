import io from "socket.io-client";
import { sendDataToUsers } from "./socket_server.js";
let socketAsClient;
export const socketConnection = async () => {
  try {
    // Create a socket connection to the server
    socketAsClient = await io("wss://thedatamining.org:4003", {
      transports: ["websocket"],
      rejectUnauthorized: false,
    });

    socketAsClient.on("marketWatch", (receivedData) => {
      if (receivedData && receivedData.product) {
        sendDataToUsers(receivedData.product, "marketWatch", receivedData);
      }
    });
  } catch (error) {
    console.error("Error", error);
  }
};

export const sendDataToServer = (name, data) => {
  if (socketAsClient) {
    socketAsClient.emit(name, data);
  }
};
