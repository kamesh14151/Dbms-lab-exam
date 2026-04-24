const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// Sample database (you can replace with MySQL later)
let bookings = [
  { name: "Kamesh", room: 101, days: 2 },
  { name: "Ajay", room: 102, days: 3 }
];

app.get("/bookings", (req, res) => {
  res.json(bookings);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
