const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = require("../model/userSchema");
const { transporter } = require("../services/emailService");

//creating the user
const createUser = async (req, res) => {
  const userData = new userSchema(req.body);
  const userEmail = req.body.userEmail;
  try {
    const isUserExists = await userSchema.findOne({
      userEmail: req.body.userEmail,
    });
    if (isUserExists) {
      //removing existing profilepic of user
      req.file ? unlincSync(req.file.path) : null;
      res.status(409).json({
        success: false,
        message: "User is already registered with this email",
      });
    } else {
      //password encryption
      const salt = await bcrypt.genSalt(10);
      userData.userPassword = await bcrypt.hash(req.body.userPassword, salt);
      //Save user profilePic in database
      const filePath = `/uploads/user/${req.file.filename}`;
      userData.profilePic = filePath;
      //sending token for the verification
      const verificationToken = Math.floor(1000 + Math.random() * 9000);
      userData.verificationToken = verificationToken;
      await transporter.sendMail({
        from: process.env.EMAIL,
        to: userEmail,
        subject: "Mail for Email verification",
        text: `Welcome user, your verification token is ${verificationToken}`,
      });

      const user = await userData.save();
      res.status(201).json({
        success: true,
        message: "User registered successfully",
        createUser: user,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error occur ${error.message}`,
    });
  }
};

const userVerify = async (req, res) => {
  try {
    const { userEmail, code } = req.body;
    const user = await userSchema.findOne({ userEmail: userEmail });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    const verificationCode = user.verificationToken;
    if (verificationCode === code) {
      // Update the user's verification status
      await userSchema.findByIdAndUpdate(user.id, { verified: true });
    } else {
      return res.status(400).json({
        success: false,
        message: "Code mismatch",
      });
    }
    // Reset the verification token
    await userSchema.findByIdAndUpdate(user.id, { verificationToken: null });
    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error occur ${error.message}`,
    });
  }
};

//User login
const userLogIn = async (req, res) => {
  try {
    const userData = await userSchema.findOne({
      userEmail: req.body.userEmail,
    });
    if (userData) {
      const hashPassword = await bcrypt.compare(
        req.body.userPassword,
        userData.userPassword
      );
      //generating token
      if (userData && hashPassword) {
        const token = jwt.sign({ userData }, process.env.SECRET_KEY, {
          expiresIn: "1h",
        });
        res.status(200).json({
          success: true,
          message: " User logged in successfully",
          accessToken: token,
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }
    } else {
      res.status(403).json({
        success: false,
        message: "User is not recognized with this email",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error occur ${error.message}`,
    });
  }
};

module.exports = {
  createUser,
  userVerify,
  userLogIn,
};
