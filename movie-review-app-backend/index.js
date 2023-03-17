const express = require("express");
const app = express();
const port = 5000;
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const movieRoutes = require("./routes/movies");
const reviewRoutes = require("./routes/reviews");
const userRoutes = require("./routes/users");
const adminRoutes = require("./routes/admin");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(
  cors({
    // origin: "https://main--lustrous-unicorn-0ed4b5.netlify.app/",
    credentials: true,
  })
);
app.use(cookieParser());

// ROUTES
app.use("/auth", authRoutes);
app.use("/movies", movieRoutes);
app.use("/reviews", reviewRoutes);
app.use("/users", userRoutes);
app.use("/admin", adminRoutes);

const connection = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO)
      .then(console.log("Connected To Database"));
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDb has disconnected");
});

mongoose.connection.on("connected", () => {
  console.log("mongoDb connected");
});

app.listen(port, async () => {
  connection();
  console.log(`App started on port ${port}`);
});
