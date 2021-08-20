const express = require("express");
const session = require("express-session");
// const path = require("path");

const userRoutes = require("./routes/userRoutes");
const channelRoutes = require("./routes/channelRoutes.js");
const PORT = 3001;
const app = express();

app.use(express.json());

app.use(
  session({
    secret: "The Phantom Menace",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: "auto" },
  })
);

app.use("/api/v1/channels", channelRoutes);
app.use("/api/v1/programs", channelRoutes);
app.use("/api/v1/category", channelRoutes);

app.use("/api/v1", channelRoutes);
app.use("/api/v1/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
