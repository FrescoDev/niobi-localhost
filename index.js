const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bunyanMiddleware = require("bunyan-middleware");
const helmet = require("helmet");
const bunyan = require("bunyan");
const { SERVER_PORT } = process.env;
const { at_path, with_method } = require("../../package.json").contract;
const logic = require("../logic");

const logger = bunyan.createLogger({
  name: "niobi-localhost",
  serializers: bunyan.stdSerializers,
  streams: [
    {
      level: "info",
      stream: process.stdout
    }
  ]
});

const requestLogger = bunyanMiddleware({
  logger,
  headerName: "server",
  obscureHeaders: ["authorization"],
  level: process.env.NODE_ENV === "development" ? "debug" : "info"
});

const app = express();

app.use(helmet());
app.use(cors());
app.use(requestLogger);
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.shutdown = () => {};

with_method === "GET" ? app.get(at_path, logic) : app.post(at_path, logic);

app.listen(SERVER_PORT, () => {
  logger.info("Server running on port %d", SERVER_PORT);
});

module.exports = app;
