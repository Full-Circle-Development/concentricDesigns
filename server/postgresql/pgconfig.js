import { Pool } from "pg";
const pool = new Pool({
  database: "qa",
});

// const getAllQuestions = () => {
//   return pool.query("SELECT * FROM questions").then(res => res.rows);
// };

const getAllQuestions = async (product_id) => {
  const values = [product_id];
  const res = await pool.query(
    "SELECT * FROM questions WHERE product_id = $1",
    values
  );
  return res.rows;
};

export default {
  getAllQuestions,
};
