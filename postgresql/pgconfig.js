// import { Pool } from "pg";
const { Pool } = require("pg");
const pool = new Pool({
  database: "qa",
});

// GET ALL QUESTIONS FOR A PRODUCT
const getAllQuestions = (product_id) => {
  const values = [product_id]; // might need to account for queries like page, sort, and count
  return pool
    .query("SELECT * FROM questions WHERE product_id = $1", values)
    .then((res) => res.rows)
    .catch((err) => err);
};

// ASYNC WAY
// const getAllQuestions = async (product_id) => {
//   const values = [product_id]; // might need to account for queries like page, sort, and count
//   const res = await pool.query(
//     "SELECT * FROM questions WHERE product_id = $1",
//     values
//   );
//   return res.rows;
// };

// GET ALL ANSWERS FOR A GIVEN QUESTION

const getAllAnswers = (question_id) => {
  const values = [question_id];
  return pool
    .query("SELECT * FROM answers WHERE question_id = $1", values)
    .then((res) => res.rows)
    .catch((err) => err);
};

// POST A QUESTION

const postQuestion = (product_id, question) => {
  const values = [
    product_id,
    question.body,
    // question.date_written,
    question.asker_name,
    question.asker_email,
    // question.reported,
    // question.helpful,
  ];
  return pool
    .query(
      "INSERT INTO questions (product_id, body, asker_name, asker_email) Values ($1, $2, $3, $4)",
      values
    )
    .then(() => true);
};

module.exports = {
  getAllQuestions,
  getAllAnswers,
  postQuestion,
};
