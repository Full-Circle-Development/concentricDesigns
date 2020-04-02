const { Pool } = require("pg");
const pool = new Pool({
  database: "qa"
});

// const getAllQuestions = () => {
//   return pool.query("SELECT * FROM questions").then(res => res.rows);
// };

const getAllQuestions = async () => {
  const res = await pool.query("SELECT * FROM questions");
  return res.rows;
};

module.exports = {
  getAllQuestions
};
