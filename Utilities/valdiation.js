const validator = require("./validator");
const mongoose = require('mongoose');

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

  const recipe = (req, res, next) => {

      const validationRule = {
        title: "required|string",
        ingredients: "required|string",
        directions: "required|string",
        prepTime: "required|string",
        serves: "required|string",
        //createdTimestamp: "required|date",
        AuthorID: "required|string",
      };
  
      validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
          return res.status(412).send({
            success: false,
            message: "Validation failed",
            data: err,
          });
        }
    
        // Validate that AuthorID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.body.AuthorID)) {
          return res.status(412).send({
            success: false,
            message: "Validation failed",
            data: { AuthorID: "Invalid ObjectId format" },
          });
        }
    
        next();
      });
    };
    

 
 
  
  
  module.exports = {
    saveUser,
    recipe,
    
  };