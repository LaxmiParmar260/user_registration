const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  userPassword: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: Number,
  },
  isActive: {
    type: String,
    default: true,
  },
});
userSchema.set("timestamps", true);

module.exports = mongoose.model("user", userSchema);
