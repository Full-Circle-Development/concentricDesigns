import qaSchema from "../models/schema.js";
import express from "express";
let router = express.Router();

router.get("/qa/:product_id", (req, res) => {
  res.send(`You requested all questions for ${product_id}`, req.params);
});

module.exports = router;
