const express = require("express");
const userRouter = express.Router();

const { createUser, userVerify, userLogIn } = require("../controller/userController");
const { userUpload } = require("../middlewares/userImageStorage");
const {
  registerUserValidation,
  verifyUserValidation,
  userLoginValidation,
} = require("../validation/user/userDataValidation");

userRouter.post(
  "/register",
  userUpload.single("profilePic"),
  registerUserValidation,
  createUser
);
//TODO front end will redirect on below route after successful Sign-up to verify email.
userRouter.patch("/verify_user", verifyUserValidation, userVerify)
userRouter.post("/login",userLoginValidation,  userLogIn)

module.exports = userRouter;
