export default (io, socket) => {
  const updatePenduduk = (data) => {
    socket.broadcast.emit("UPDATEPENDUDUK", data);
  };
  socket.on("penduduk", updatePenduduk);

  const updateKeluarga = (data) => {
    socket.broadcast.emit("UPDATEKELUARGA", data);
  };
  socket.on("updateKeluarga", updateKeluarga);

  const refreshKeluhan = (data) => {
    socket.broadcast.emit("REFRESHKELUHAN", data);
  };
  socket.on("refreshKeluhan", refreshKeluhan);
};
