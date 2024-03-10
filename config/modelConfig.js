require("dotenv").config()
const mongoose = require("mongoose");

mongoose.connect(process.env.URL, {
});
mongoose.connection.on("error", (err) => {
 console.log("mongoose connection error");
});
mongoose.connection.on("connect", (err, res) => {
console.log("mongoose is connected");
});
