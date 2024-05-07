const { createServer } = require("https")
const app = require("./app")
const { Server } = require("socket.io")
require("dotenv").config()

const httpsServer = createServer(app)
const io = new Server(httpsServer, {
    cors:{
        origin:"k10c109.p.ssafy.io"
    }
})

require("./utils/io")(io)
httpsServer.listen(process.env.PORT,() => {
    console.log("server listening on port")
})