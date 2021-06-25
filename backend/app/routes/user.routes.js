module.exports = app => {
    const users = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    // Create a new user
    router.post("/", users.create);

    router.get("/", users.findAll);

    router.get("/:id", users.findOne);

    router.put("/:id", users.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", users.delete);
  
    // Create a new Tutorial
    router.delete("/", users.deleteAll);
    
    app.use('/api/users', router);
  };