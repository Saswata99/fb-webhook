import express from "express";
import * as dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 4000;
const app = express();

let message = [];

app.get('/1', function(req, res) {
  res.send('<pre>' + JSON.stringify(message, null, 2) + '</pre>');
});

app.get("/webhooks", (req, res) => {
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  if (mode && token) {
    if (mode == "subscribe" && token === process.env.FB_VARIFY_TOKEN) {
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  } else {
    res.status(404).send("Invalid");
  }
});


app.post("/webhooks", (req, res) => {
  let body = req.body;
  console.log(body)
  if (body) {
    message = body;
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});


app.listen(PORT, () => console.log(`listening port ${PORT}`));
