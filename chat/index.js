const { createServer } = require("http")
const app = require("./app")
const { Server } = require("socket.io")
require("dotenv").config()

const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors:{
        origin:["https://k10c109.p.ssafy.io", "https://trigger109.com", "https://chat.trigger109.com"],
        methods: "*",
        allowedHeaders: "Access-Control-Allow-Origin",
        credentials: true
    }
})

// Socket.IO 연결 이벤트에 로그 추가
io.on('connection', (socket) => {
    console.log(`Client connected from origin: ${socket.handshake.headers.origin}`);
});

require("./utils/io")(io)
httpServer.listen(5002, () => {
    console.log("Server listening on port 5002")
    console.log("CORS origin set to", corsOrigin)
})
