const { createServer } = require("http")
const app = require("./app")
const { Server } = require("socket.io")
require("dotenv").config()

const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors:{
        origin:"http://k10c109.p.ssafy.io:3002"
    }
})

require("./utils/io")(io)
httpServer.listen(process.env.PORT,() => {
    console.log("server listening on port")
})