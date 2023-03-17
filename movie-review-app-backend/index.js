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
app.use(cors({ origin: true, credentials: true }));
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
      .connect(
        "mongodb+srv://neel1905:neel1905@cluster0.2mdg4wr.mongodb.net/movie-app?retryWrites=true&w=majority"
      )
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
