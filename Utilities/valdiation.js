const validator = require("./validator");

const saveUser = (req, res, next) => {
    const validationRule = {
      firstName: "required|string",
      lastName: "required|string",
      email: "required|email",
      username: "required|string",
    };
    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: "Validation failed",
          data: err,
        });
      } else {
        next();
      }
    });
  };

  module.exports = {
    saveUser,
  };