// import { Pool } from "pg";
const { Pool } = require("pg");
const pool = new Pool({
  database: "qa",
});

// GET ALL QUESTIONS FOR A PRODUCT

const getAllQuestions = (product_id) => {
  const values = [product_id]; // might need to account for queries like page, sort, and count
  return pool
    .query(
      `SELECT DISTINCT ON (questions.question_id, answers.answer_id) questions.question_id, questions.question_body, questions.question_date, questions.asker_name, questions.asker_email, questions.question_helpfulness, questions.question_reported, answers.*, answers_photos.url 
      FROM questions LEFT JOIN answers ON questions.question_id = answers.answer_question_id 
      LEFT JOIN answers_photos ON answers.answer_id = answers_photos.photo_answer_id 
      WHERE questions.product_id = $1 ORDER BY questions.question_id ASC, answers.answer_id ASC`, // ORDER BY questions.question_id ASC
      values
    )
    .then((res) => {
      let productID = values[0];
      let resRow = res.rows;
      let answersObj = {};
      let resultObj = {
        product_id: productID,
        results: [],
      };

      for (let i = 0; i < resRow.length; i++) {
        let photosArr = [];
        if (resRow[i].url) {
          photosArr.push(resRow[i].url);
        }

        if (resRow[i].answer_id) {
          answersObj[resRow[i].answer_id] = {
            // Has to be a number?? Can't figure out how!
            id: resRow[i].answer_id,
            body: resRow[i].answer_body,
            date: resRow[i].answer_date,
            answerer_name: resRow[i].answerer_name,
            helpfulness: resRow[i].answer_helpfulness, // might be pulling question helpfullness
            photos: photosArr,
          };

          if (resRow[i + 1]) {
            if (resRow[i].question_id === resRow[i + 1].question_id) {
              continue;
            }
          }
        }

        let questionsObj = {
          question_id: resRow[i].question_id,
          question_body: resRow[i].question_body,
          question_date: resRow[i].question_date,
          asker_name: resRow[i].asker_name,
          question_helpfulness: resRow[i].question_helpfulness,
          reported: resRow[i].question_reported,
          answers: answersObj,
        };

        resultObj.results.push(questionsObj);
        photosArr = [];
        answersObj = {};
      }

      return resultObj;
    })
    .catch((err) => err);
};

// ex.
// {
//   "product_id": "5",
//   "results": [{
//         "question_id": 37,
//         "question_body": "Why is this product cheaper here than other sites?",
//         "question_date": "2018-10-18T00:00:00.000Z",
//         "asker_name": "williamsmith",
//         "question_helpfulness": 4,
//         "reported": 0,
//         "answers": {
//           68: {
//             "id": 68,
//             "body": "We are selling it here without any markup from the middleman!",
//             "date": "2018-08-18T00:00:00.000Z",
//             "answerer_name": "Seller",
//             "helpfulness": 4,
//             "photos": []
//             // ...
//           }
//         }
//       },

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
    // question.date_written, // defaulting in DB to current_timestamp
    question.asker_name,
    question.asker_email,
    // question.reported, // defaulting in DB to 0
    // question.helpful, // defaulting in DB to 0
  ];
  return pool
    .query(
      "INSERT INTO questions (product_id, body, asker_name, asker_email) Values ($1, $2, $3, $4)",
      values
    )
    .then(() => true); // {}
};

// POST AN ANSWER

const postAnswer = (question_id, answer) => {
  values = [
    question_id,
    answer.body,
    answerer.name,
    answerer.email,
    answer.photos,
  ];
  return pool
    .query(
      "INSERT INTO answers (question_id, body, answerer_name, answerer_email, photos",
      values
    )
    .then(() => true);
};

module.exports = {
  getAllQuestions,
  getAllAnswers,
  postQuestion,
  postAnswer,
};
