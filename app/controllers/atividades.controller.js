const db = require("../models");
const Atividade = db.atividades;
const Op = db.Sequelize.Op;

// Create and Save a new Atividade
exports.create = (req, res) => {
  // Validate request
  if (!req.body.evento) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Atividade
  const atividade = {
    atividade: req.body.evento,
    descricao: req.body.descricao,
    data: req.body.data,
    inicio: req.body.inicio,
    fim: req.body.fim,
    repete: req.body.repete ? req.body.repete : false,
    semanas: req.body.semanas

  };

  // Save Atividade in the database
  Atividade.create(atividade)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Atividade."
      });
    });
};
// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const eventos = req.query.evento;
  var condition = eventos ? { eventos: { [Op.like]: `%${eventos}%` } } : null;

  Atividade.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Find a single Atividade with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Atividade.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Atividade with id=" + id
      });
    });
};

// Update a Atividade by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Atividade.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Atividade was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Atividade with id=${id}. Maybe Atividade was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Atividade with id=" + id
      });
    });
};

// Delete a Atividade with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Atividade.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Atividade was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Atividade with id=${id}. Maybe Atividade was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Atividade with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Atividade.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Tutorials were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  Atividade.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};