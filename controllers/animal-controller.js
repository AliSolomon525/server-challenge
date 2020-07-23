var express = require("express");
var router = express.Router();
var sequelize = require("../db");
const Animal = sequelize.import("../models/animal");
let validateSession = require("../middleware/validate-session");

router.post("/create", validateSession, (req, res) => {
  const animal = {
    name: req.body.name,
    legNumber: req.body.legNumber,
    predator: req.body.predator,
    owner: req.user.id,
  };
  Animal.create(animal)
    .then((animal) => res.status(200).json(animal))
    .catch((err) => res.status(500).json({ error: err.message }));
});

router.get("/mine", validateSession, (req, res) => {
  let owner = req.user.id;
  Animal.findAll({
    where: { owner: owner },
  })
    .then((animals) => res.status(200).json(animals))
    .catch((err) => res.status(500).json({ error: err }));
});

router.delete("/delete/:id", validateSession, function (req, res) {
  const query = { where: { id: req.params.id, owner: req.user.id } };

  Animal.destroy(query)
    .then((response) => {
      if (response !== 0) {
        res.status(200).json({ message: "An animal was deleted" });
      } else {
        res.status(200).json({ message: "Animal does not exist for user" });
      }
    })
    .catch((err) => res.status(500).json({ error: err }));
});

router.put("/update/:id", validateSession, function (req, res) {
  const updateAnimal = {
    name: req.body.name,
    legNumber: req.body.legNumber,
    predator: req.body.predator,
    owner: req.user.id,
  };

  const query = { where: { id: req.params.id } };

  Animal.update(updateAnimal, query)
    .then((animals) => res.status(200).json(animals))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
