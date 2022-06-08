require("dotenv").config();
const express = require("express");
const cors = require("cors");

const ddns = require("./ddns/server");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/v1", require("./routes/v1/app.js"));

console.log("[INFO] Node Dynamic DNS, Author: Henry Herrmann, Version: 1.0");
console.log("[INFO] Starting webserver...");

ddns.run();

app.listen(3031, () =>{
    console.log("[INFO] Webserver successfully started.");
});
