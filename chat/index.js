const { createServer } = require("http")
const app = require("./app")
const { Server } = require("socket.io")
require("dotenv").config()

console.log("1")

const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors:{
        origin:"https://k10c109.p.ssafy.io"
    }
})
console.log("2")
console.log("origin", origin)
require("./utils/io")(io)
httpServer.listen(5002,() => {
    console.log("server listening on port")
    console.log("origin", origin)
})
console.log("3")
