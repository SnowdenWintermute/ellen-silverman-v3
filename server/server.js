const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

// app
const app = express();
app.set("trust proxy", true);

// db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log("DB CONNECTION ERR", err));

// middlewares
app.use(express.json({ extended: false }));
app.use(bodyParser.json({ limit: "4mb" }));
app.use(cors());

// routes middleware
app.use("/api/auth", require("./routes/auth"));
app.use("/api/paintings", require("./routes/paintings"));
app.use("/api/series", require("./routes/series"));
app.use("/api/user", require("./routes/user"));
app.use("/api/stripe", require("./routes/stripe"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/pages", require("./routes/page"));

// serve static files
const path = require('path');
app.use(express.static(path.join(__dirname, '../client/build')));
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
