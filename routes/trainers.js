var express = require("express");
var router = express.Router();
const db = require("../models/index");
const Trainer = db.sequelize.models.Trainer;

router.get("/", async function (req, res) {
  let trainers = await Trainer.findAll();
  res.render("trainers/list", {
    title: "List of trainers",
    message: "List of all trainers",
    list: trainers,
  });
});

router.get("/create", function (req, res) {
  res.render("trainers/create-update", {
    title: "Create trainer",
    message: "Create a new trainer",
    action: "create",
    trainer: {},
  });
});

router.post("/create", async function (req, res) {
  let insert = await Trainer.create({
    firstName: req.body.firstName.replace(/(?:^|\s)\S/g, function (a) {
      return a.toUpperCase();
    }),
    lastName: req.body.lastName.replace(/(?:^|\s)\S/g, function (a) {
      return a.toUpperCase();
    }),
    email: req.body.email,
    subject: req.body.subject.replace(/(?:^|\s)\S/g, function (a) {
      return a.toUpperCase();
    }),
  });
  res.redirect("/trainers");
});

router.get("/delete", async function (req, res) {
  let deleted = await Trainer.destroy({
    where: { id: `${req.query.id}` },
  }).then(
    (deleted) => {
      if (deleted === 1) {
        res.render("trainers/deleted", {
          title: "Trainer delete page",
          // list: getCustomers()
          message: `You deleted the trainer with id: ${req.query.id}`,
        });
      }
    },
    (error) => {
      res.render("trainers/deleted", {
        title: "Trainers delete page",
        // list: getCustomers()
        message: `<div><p>There was an error deleting customer with id: ${req.query.id}</p>
                               <p>Error: ${error}</p></div>`,
      });
    }
  );
});

router.get("/update", async function (req, res) {
  let trainer = await Trainer.findByPk(req.query.id, {
    attributes: ["id", "firstName", "lastName", "email", "subject"],
  });
  console.log(trainer);
  res.render("trainers/create-update", {
    title: "Update trainer",
    message: "Update a trainer",
    action: "update",
    trainer: trainer,
  });
});

router.post("/update", async function (req, res) {
  let trainer = await Trainer.findByPk(req.body.id);
  if (trainer.id == req.body.id) {
    trainer.firstName = req.body.firstName;
    trainer.lastName = req.body.lastName;
    trainer.email = req.body.email;
    trainer.subject = req.body.subject;
    await trainer.save();
  }
  res.redirect("/trainers");
});

module.exports = router;
