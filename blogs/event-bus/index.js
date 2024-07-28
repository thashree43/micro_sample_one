import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

app.post("/events", async (req, res) => {
  const event = req.body;
  console.log( "the events from the event-bus",event);
  try {
    await axios.post("http://localhost:7000/events", event);
    await axios.post("http://localhost:7001/events", event);
    await axios.post("http://localhost:7003/events", event);
    await axios.post("http://localhost:7004/events", event); 

  } catch (error) {
    console.error("Error posting event:", error);
  }

  res.send({ status: "ok" });
});

const port = 6995;
app.listen(port, () => {
  console.log(`Event bus running on http://localhost:${port}`);
});