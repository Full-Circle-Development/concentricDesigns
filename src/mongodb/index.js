import express, { static } from "express";

let app = express();

let questionsRoute = require("./routes/questions.js");

app.use((req, res, next) => {
  console.log(`${new Date().toString()} => ${req.originalUrl}`);
  next();
});

app.use(questionsRoute);
app.use(static("public"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is up and running on ${PORT}!`));
