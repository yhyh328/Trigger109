const { createServer } = require("http")
const app = require("./app")
const { Server } = require("socket.io")
require("dotenv").config()

const allowedOrigins = ["https://k10c109.p.ssafy.io", "https://k10c109.p.ssafy.io:3000" , "https://k10c109.p.ssafy.io:3001" , "https://k10c109.p.ssafy.io:5001" ,  "https://trigger109.com", "https://jenkins.trigger109.com"];

// const httpServer = createServer(app)
// const io = new Server(httpServer, {
//     cors:{
//         origin:"http://localhost:3000"
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