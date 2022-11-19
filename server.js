import express from "express";
import * as dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT;

const app = express();

app.post("/webhook", (req, res) => {
  let body = req.body;
  if (body && body.object == "page") {
    res.status(200).sendStatus("EVENT_RECEIVED");
  } else {
    res.sendStatus(404);
  }
});

app.get("/webhooks", (req, res) => {
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  if (mode && token) {
    if (mode == "subscribe" && token === "a6cd02d2-ebb0-4bdc-9073-c886394d1553") {
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  } else {
    res.status(404).send("Nope");
  }
});

app.listen(PORT, () => console.log(`listening port ${PORT}`));
