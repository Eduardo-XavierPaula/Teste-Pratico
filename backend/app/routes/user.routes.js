module.exports = app => {
    const users = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", users.create);

    router.get("/:id", users.findAll);//id representa clientId

    router.get("/one/:id", users.findOne);

    router.put("/:id", users.update);
    router.put("/password/:id", users.updateSenha);
  
    router.delete("/:id", users.delete);
  
    router.delete("/all/:id", users.deleteAll);//id representa clientId
    
    app.use('/api/users', router);
  };