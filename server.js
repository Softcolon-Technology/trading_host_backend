import express from "express";
import http from "http";
import { Server } from "socket.io";
import { instrument } from "@socket.io/admin-ui";
import { setIoObject } from "./socket_server.js";
import { socketConnection } from "./socket_client.js";

const app = express();
const server = http.createServer(app);

app.get("/", async (req, res) => {
  console.log("api hit");
  // await socketConnection()
});

server.listen(3002, () => {
  console.log("Server is listening on port 3002");
});

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

instrument(io, {
  auth: false,
  mode: "development",
});

await setIoObject(io);
await socketConnection();
