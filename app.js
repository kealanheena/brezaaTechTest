const express = require("express");
const userRoutes = require("./routes/user.routes");
const app = express();
const mongodb = require("./mongodb/mongodb.connect");
const cors = require("cors");

mongodb.connect();

app.use('/uploads/', express.static('uploads'))
app.use(cors());
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());

app.use("/users", userRoutes);

app.get('/', (req, res) => { res.send('Hello from Express!') }) 

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
