module.exports = app => {
  const atividades = require("../controllers/atividades.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", atividades.create);

  // Retrieve all atividades
  router.get("/", atividades.findAll);

  // Retrieve all published atividades
  router.get("/published", atividades.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", atividades.findOne);

  // Update a Tutorial with id
  router.put("/:id", atividades.update);

  // Delete a Tutorial with id
  router.delete("/:id", atividades.delete);

  // Delete all atividades
  router.delete("/", atividades.deleteAll);

  app.use('/api/atividades', router);
};