import qaSchema from "../models/schema.js";
import express from "express";
let router = express.Router();

////////////// GET ROUTES ///////////////

router.get("/qa/:product_id", (req, res) => {
  //   res.send(`You requested all questions for ${product_id}`, req.params);
  if (!req.query.product_id) {
    return res.status(400).send("Missing URL parameter: product_id");
  }
  qaSchema
    .getAllQuestions({
      product_id: req.query.product_id,
      id: req.query.id, // might have to change it to something like question['id'] and down..
      body: req.query.body,
      date: req.query.date,
      email: req.query.email,
      reported: req.query.reported,
      helpful: req.query.helpful
    })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
