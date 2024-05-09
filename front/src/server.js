import { io } from "socket.io-client"
const socket = io("https://chat.trigger109.com")
export default socket;