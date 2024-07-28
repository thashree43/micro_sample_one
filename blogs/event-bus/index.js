import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

const events =[]

app.post("/events", async (req, res) => {
  const event = req.body;
  events.push(event);
  console.log("the events from the event-bus", event);
  try {
    await axios.post("http://localhost:7000/events", event);
    await axios.post("http://localhost:7001/events", event);
    await axios.post("http://localhost:7003/events", event);
    await axios.post("http://localhost:7004/events", event); 

    if (event.type === 'commentupdated') {
      await axios.post('http://localhost:7002/events', event);
    }
  } catch (error) {
    console.error("Error posting event:", error);
  }

  res.send({ status: "ok" });
});

app.get("/events",(req,res)=>{
  res.send(events)
})
const port = 6995;
app.listen(port, () => {
  console.log(`Event bus running on http://localhost:${port}`);
});
