const express = require('express');
const { constant: http } = require('http2');
const morgan = require('morgan');

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded());
app.use(morgan('dev'));

// routers
app.use("/", require("./src/routers"));

app.get('/*splat', (req, res) => {
  return res
    .status(http.HTTP_STATUS_NOT_FOUND)
    .json({
      success: false,
      message: "Endpoint not found"
    });
})

const PORT = process.env.APP_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})