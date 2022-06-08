const express = require("express");
const fs = require("fs").promises;

const { getProtocol } = require("../../Protocol");

const router = express.Router();

router.get("/", (req, res) =>{
    res.status(200).send(getProtocol(200, "Node Dynamic DNS, Version: 1.0, Author: Henry Herrmann"));
});

router.post("/update", async (req, res) => {
    if(!req.query.username || !req.query.password || !req.query.myip) return res.status(500).send(getProtocol(500, "Missing parameters."));

    if(req.query.username != process.env.USER || req.query.password != process.env.PASSWORD) return res.status(500).send(getProtocol(500, "Incorrect login credentials."));

    await fs.writeFile("../../ip.txt", req.query.myip).catch(err =>{
        return res.status(500).send(getProtocol(500, "Internal Server Error"));
    });

    return res.status(200).send(getProtocol(200, "IP updated successfully."));
});

router.get("/ip", async (req, res) =>{
    if(!req.query.username || !req.query.password) return res.status(500).send(getProtocol(500, "Missing parameters."));

    if(req.query.username != process.env.USER || req.query.password != process.env.PASSWORD) return res.status(500).send(getProtocol(500, "Incorrect login credentials."));

    const content = await fs.readFile("../../ip.txt", "utf-8").catch(err =>{
        return res.status(500).send(getProtocol(500, "Internal Server Error"));
    });

    return res.status(200).send(getProtocol(200, content));
});

module.exports = router;
