const express = require("express");
require("./config/modelConfig");
require("dotenv").config();

const PORT = process.env.PORT || 6000;
const router = require("./routes/userRoutes");

const app = express();
app.use(express.json());
app.use("/", router);

app.listen(PORT, (req, res) => {
  console.log(`server is running on port : ${PORT}`);
});
