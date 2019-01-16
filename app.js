const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const config = require("./config");

const {
    GlobalMiddleware
} = require('./middlewares');


GlobalMiddleware.handle(app);

const {
    WebRouter,
    ApiRouter
} = require('./routers');

app.use('/api', ApiRouter);

server.listen(config.get("port"), () => {
    console.log("Server is running...");
})