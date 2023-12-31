import { sendDataToServer } from "./socket_client.js";

let socketAsServer = "";
export const setIoObject = async (socketIo) => {
  console.log("Socket connection start");
  socketAsServer = socketIo;
  if (socketAsServer) await setSocket(socketAsServer); // Listen ws
};

export const setSocket = async (socketAsServer) => {
  try {
    console.log("dkjbddkjdbd ")
    socketAsServer.on("connection", async (socket) => {
      console.log("hidddk")
      socket.on("subscribeToServerMarket", async (data) => {
        console.log("sahil")
        if (Array.isArray(data)) {
          data.forEach((i) => {
            sendDataToServer("addMarketWatch", { product: i });
          });
        }
      });
      socket.on("joinRoom", (data) => {
        console.log("patoliya")
        const rooms = data;
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
