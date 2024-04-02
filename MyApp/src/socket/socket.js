
import { io } from "socket.io-client";
import API_CONFIG from "../api/apiConfig";
export const socket = io.connect(API_CONFIG.socket);