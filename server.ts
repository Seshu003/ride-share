const express = require("express");
const dotenv = require("dotenv");
const { connectDB } = require("./config/db");
const path = require("path");
const cors = require("cors");

dotenv.config({ path: "./config/config.env" });
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json({ extended: false }));

// CORS
app.use(cors({
  origin: ['http://localhost:3001', 'http://localhost:5173', 'https://ride-share-topaz.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// ROUTES
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/users", require("./routes/userRoute"));
app.use("/api/rides", require("./routes/driverRideRoute"));
app.use("/api/passengers", require("./routes/passengerRideRoute"));
app.use("/api/vehicles", require("./routes/vehicleRoute"));

app.get("/", (req: any, res: any) => {
  console.log("Hello world");
  return res.status(200).json({ message: "Hi there! This is a backend project for ride sharing. Check my GitHub: https://github.com/Hikmahx/ride-share for more info" });
});

app.listen(PORT, () => console.log("This is listening on PORT: " + PORT));

