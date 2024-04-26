const { createServer } = require("http")
const app = require("./app")
const { Server } = require("socket.io")
require("dotenv").config()

const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors:{
        origin:"ws://k10c109.p.ssafy.io:3000/ws"
    }
})

require("./utils/io")(io)
httpServer.listen(process.env.PORT,() => {
    console.log("server listening on port")
})