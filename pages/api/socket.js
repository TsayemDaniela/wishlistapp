// TODO: fix implementation with ws real time update
import Event from '../../models/Event';
import { Server } from 'socket.io'

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    // console.log('Socket is already running')
  } else {
    // console.log('Socket is initializing')
    const io = new Server(res.socket.server)
    res.socket.server.io = io

    io.on('connection', socket => {
      socket.on(Event.ItemStateChanged, msg => {
        socket.broadcast.emit(Event.UpdateItem, msg)
      })
    })
  }
  res.end()
}

export default SocketHandler