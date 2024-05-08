const { createServer } = require("http")
const app = require("./app")
const { Server } = require("socket.io")
require("dotenv").config()

const allowedOrigins = ["https://k10c109.p.ssafy.io", "https://trigger109.com", "https://jenkins.trigger109.com"];

// const httpServer = createServer(app)
// const io = new Server(httpServer, {
//     cors:{
//         origin:"k10c109.p.ssafy.io"
//     }
// })

const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true)
            } else {
                callback(new Error("Origin not allowed by CORS"))
            }
        }
    }
})

require("./utils/io")(io)
httpServer.listen(process.env.PORT,() => {
    console.log("server listening on port")
})