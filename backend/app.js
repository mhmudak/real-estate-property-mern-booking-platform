const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");
require('dotenv').config();
const db = require('./Config/config');

const app = express();

// CORS - Allow requests from frontend
app.use(cors({
  origin: "http://localhost:5173", // your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"], // allowed methods
  credentials: true
}));

// Middleware
app.use(express.json());

app.use(cookieParser());

// Routes
const userRoute = require('./Routes/userRoute');
const propertyRoute = require('./Routes/propertyRoute');
const bookingRoute = require("./Routes/bookingRoute");

app.use('/api/users', userRoute);
app.use('/api/properties', propertyRoute);
app.use("/api/bookings", bookingRoute);

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log("MyServer is running on port:", PORT);
});
