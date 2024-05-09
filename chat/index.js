const { createServer } = require("http")
const app = require("./app")
const { Server } = require("socket.io")
require("dotenv").config()

const allowedOrigins = ["http://k10c109.p.ssafy.io", "http://k10c109.p.ssafy.io:3000" , "http://k10c109.p.ssafy.io:3001" , "http://k10c109.p.ssafy.io:5001" ,  "http://trigger109.com", "http://jenkins.trigger109.com"];

const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors:{
        origin:"http://k10c109.p.ssafy.io:3000"
    }
})

// const httpServer = createServer(app)
// const io = new Server(httpServer, {
//     cors: {
//         origin: function (origin, callback) {
//             if (!origin || allowedOrigins.includes(origin)) {
//                 callback(null, true)
//             } else {
//                 callback(new Error("Origin not allowed by CORS"))
//             }
//         }
//     }
// })

require("./utils/io")(io)
// httpServer.listen(process.env.PORT,() => {
//     console.log("server listening on port")
// })
httpServer.listen(3000,() => {
    console.log("server listening on port")
})