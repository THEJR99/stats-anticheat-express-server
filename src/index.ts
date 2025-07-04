import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import http from 'http';

import uploadRoutes from "./routes/upload.routes";


const PORT: number = 8080

async function start() {

    //console.log();

    const app = express();

    const server = http.createServer(app);

    app.use(express.json());
    
    app.use("/api/replay", uploadRoutes);

    server.listen(PORT, () => console.log("Server is running on port " + PORT));
}

start();