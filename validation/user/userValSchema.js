const joi = require("joi")

const { joiPasswordExtendCore } = require("joi-password");
const joiPassword = joi.extend(joiPasswordExtendCore);

const userValSchema = {
  registerUser: joi
    .object({
      userName: joi
        .string()
        .min(2)
        .message({
          "string.min": "{#lable} should contain at least {#limit} character",
        })
        .required(),
      userEmail: joi
        .string()
        .email()
        .message("Invalid email address")
        .required(),
      userPassword: joiPassword
        .string()
        .minOfSpecialCharacters(1)
        .minOfLowercase(1)
        .minOfUppercase(1)
        .minOfNumeric(1)
        .noWhiteSpaces()
        .onlyLatinCharacters()
        .messages({
          "password.minOfUppercase":
            "{#lable} should contain at least {#min} uppercase character",
          "password.minOfSpecialCharacters":
            "{#lable} should contain at least {#min} special character",
          "password.minofLowercase":
            "{#lable} should contain at least {#min} lowercase character",
          "password.minOfNumeric":
            "{#label} should contain at least {#min} numeric character",
          "password.noWhiteSpaces": "{#label} should not contain white spaces",
          "password.onlyLatinCharacters":
            "{#label} should contain only latin characters",
        })
        .required(),
    })
    .unknown(true),

   verifyUser: joi
   .object({
    userEmail : joi
    .string()
    .email()
    .message("invalid email address")
    .required(),
    code: joi.number().required()
   })
   .unknown(true),

  userLogIn: joi.object({
    userEmail: joi.string().email().message("invalid email address").required(),
    userPassword: joiPassword
      .string()
      .minOfSpecialCharacters(1)
      .minOfLowercase(1)
      .minOfUppercase(1)
      .minOfNumeric(1)
      .noWhiteSpaces()
      .onlyLatinCharacters()
      .messages({
        "password.minOfUppercase":
          "{#lable} should at least {#min} uppercase character",
        "password.minOfSpecialCharacters":
          "{#lable} should contain at least {#min} special character",
        "password.minofLowercase":
          "{#lable} should contain at least {#min} lowercase character",
        "password.minOfNumeric":
          "{#label} should contain at least {#min} numeric character",
        "password.noWhiteSpaces": "{#label} should not contain white spaces",
        "password.onlyLatinCharacters":
          "{#label} should contain only latin characters",
      })
      .required(),
  }),
};

module.exports = userValSchema;
