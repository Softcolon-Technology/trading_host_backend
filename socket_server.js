import { sendDataToServer } from "./socket_client.js";

let socketAsServer = "";
export const setIoObject = async (socketIo) => {
  console.log("Socket connection start");
  socketAsServer = socketIo;
  if (socketAsServer) await setSocket(socketAsServer); // Listen ws
};

export const setSocket = async (socketAsServer) => {
  try {
    socketAsServer.on("connection", async (socket) => {
      socket.on("subscribeToServerMarket", async (data) => {
        const jsonData = JSON.parse(data);
        if (Array.isArray(jsonData)) {
          jsonData.forEach((data) => {
            sendDataToServer("addMarketWatch", { product: data });
          });
        }
      });
      socket.on("joinRoom", (data) => {
        const rooms = JSON.parse(data);
        if (Array.isArray(rooms)) {
          rooms.forEach((room) => {
            socket.join(room);
          });
        }
      });
      socket.on("leaveRoom", async function (room) {
        // await leaveRoom(room, userId, socket)
      });
      socket.on("reJoinRoom", async function () {
        // await joinUserRoom(userId, socket)
      });
      socket.on("disconnect", async function () {
        // console.log('A user disconnected')
      });
    });
  } catch (e) {
    console.log("Error in set socket");
    console.log(e);
  }
};

export const sendDataToUsers = (room, name, data) => {
  if (socketAsServer) {
    socketAsServer.to(room).emit(name, data);
  }
};
