module.exports = SocketBase => class Socket extends SocketBase {
  websocket (wss) {
    wss.on('connection', (ws, req) => {
      ws.on('message', data => {
        ws.send(`message received: ${data.toString()}`)
      })
    })
  }
}
