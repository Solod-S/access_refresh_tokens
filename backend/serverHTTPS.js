const mongoose = require("mongoose");
const https = require("https");
const app = require("./app");
const fs = require("fs");

const { DB_HOST, PORT = 3000 } = process.env;

// const options = {
//   key: fs.readFileSync("certificates/key.pem"),
//   certkey: fs.readFileSync("certificates/cert.pem"),
// };

const privateKey = fs.readFileSync("certificates/key.pem", "utf8");
const certificate = fs.readFileSync("certificates/cert.pem", "utf8");
const credentials = { key: privateKey, cert: certificate };

// Create HTTPS server
const httpsServer = https.createServer(credentials, app);

// https.createServer(options, (req, res) => {
//   res.end("SSL ADDED");
// });

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => httpsServer.listen(PORT))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
