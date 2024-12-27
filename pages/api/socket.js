import { Server } from "socket.io";
import messageHandler from "@/utils/messageHandler";

export default function SockerHandler(req, res) {
  console.log("Already connected");
  if (res.socket.server.io) return res.end();

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  const onConnection = (socket) => {
    messageHandler(io, socket);
  };

  io.on("connection", onConnection);
  return res.end();
}
