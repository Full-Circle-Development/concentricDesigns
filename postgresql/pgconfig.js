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
          photosArr.push(resRow[i].url); // currently NOT getting all URL's
        }

        if (resRow[i].answer_id) {
          answersObj[resRow[i].answer_id] = {
            id: resRow[i].answer_id,
            body: resRow[i].answer_body,
            date: resRow[i].answer_date,
            answerer_name: resRow[i].answerer_name,
            helpfulness: resRow[i].answer_reported,
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
          question_helpfulness: resRow[i].question_reported,
          reported: resRow[i].question_helpfulness,
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

// GET ALL ANSWERS FOR A GIVEN QUESTION

const getAllAnswers = (question_id) => {
  const values = [question_id];

  return (
    pool
      .query(
        `SELECT DISTINCT ON (answers.answer_id) answers.*, answers_photos.photo_id, answers_photos.url 
    FROM answers LEFT JOIN answers_photos ON answers.answer_id = answers_photos.photo_answer_id 
    WHERE answers.answer_question_id = $1 ORDER BY answers.answer_id ASC`,
        values
      )
      // .query("SELECT * FROM answers WHERE answer_question_id = $1", values)
      .then((res) => {
        let resRows = res.rows;
        let resultObj = {
          question: values[0],
          page: Number(values[1]) || 0,
          count: Number(values[2]) || 5,
          results: [],
        };
        // let photosArr = [];
        // let answerObj = {};
        // return resultObj;
        for (let i = 0; i < resRows.length; i++) {
          let photosArr = [];

          if (
            typeof resRows[i].url === "string" &&
            resRows[i].url !== "{}" &&
            resRows[i].url !== ""
          ) {
            let photosObj = {
              id: resRows[i].photo_id,
              url: resRows[i].url,
            };
            photosArr.push(photosObj);
          }

          let answerObj = {
            answer_id: resRows[i].answer_id,
            body: resRows[i].answer_body,
            date: resRows[i].answer_date,
            answerer_name: resRows[i].answerer_name,
            helpfulness: resRows[i].answer_reported,
            photos: photosArr,
          };

          resultObj.results.push(answerObj);
          // photosObj = {};
          // answerObj = {};
        }

        return resultObj;
      })
      .catch((err) => err)
  );
};

// POST A QUESTION

const postQuestion = (product_id, question) => {
  const values = [
    product_id,
    question.question_body,
    // question.date_written, // defaulting in DB to current_timestamp
    question.asker_name,
    question.asker_email,
    // question.reported, // defaulting in DB to 0
    // question.helpful, // defaulting in DB to 0
  ];
  return pool
    .query(
      "INSERT INTO questions (product_id, question_body, asker_name, asker_email) Values ($1, $2, $3, $4)",
      values
    )
    .then(() => true)
    .catch((err) => err);
};

// POST AN ANSWER

const postAnswer = (question_id, answer) => {
  let photoURL = answer.photos || [];
  const values = [
    question_id,
    answer.body,
    // answer.answer_date, // defaulting in DB to current_timestamp
    answer.name,
    answer.email,
    photoURL, // has a default in DB to []
    // answer.reported, // defaulting in DB to 0
    // answer.helpful, // defaulting in DB to 0
  ];
  return (
    pool
      .query(
        `WITH new_answer AS (
          INSERT INTO answers (answer_question_id, answer_body, answerer_name, answerer_email) VALUES ($1, $2, $3, $4) 
         RETURNING answer_id AS a_id
          )
         INSERT INTO answers_photos (photo_answer_id, url)
          SELECT a_id, $5 FROM new_answer
      `,
        values
      )
      // the $5 might not work....

      // .query(
      //   "INSERT INTO answers (question_id, answer_body, answerer_name, answerer_email) VALUES ($1, $2, $3, $4)",
      //   values
      // )
      // .then((res) => {
      //   let resRows = res.rows;
      //   for (let i = 0; i < resRows.length; i++) {
      //     if (!resRows[i].url) {
      //       values[4] = [];
      //     }
      //   }
      // })
      .then(() => true)
      .catch((err) => err)
  );
};

// PUT A QUESTION HELPFUL

const putQuestionHelpful = (question_id) => {
  let values = [question_id];
  return pool
    .query(
      `UPDATE questions SET question_helpfulness = question_helpfulness + 1 WHERE question_id = $1`,
      values
    )
    .then(() => true)
    .catch((err) => err);
};

// PUT A QUESTION REPORTED

const putQuestionsReported = (question_id) => {
  let values = [question_id];
  return pool
    .query(
      `UPDATE questions SET question_reported = 1 WHERE question_id = $1`,
      values
    )
    .then(() => true)
    .catch((err) => err);
};

// PUT ANSWER HELPFUL

const putAnswerHelpful = (answer_id) => {
  let values = [answer_id];
  return pool
    .query(
      `UPDATE answers SET answer_helpfulness = answer_helpfulness + 1 WHERE answer_id = $1`,
      values
    )
    .then(() => true)
    .catch((err) => err);
};

// PUT ANSWER REPORTED

const putAnswerReported = (answer_id) => {
  let values = [answer_id];
  return pool
    .query(
      `UPDATE answers SET answer_reported = 1 WHERE answer_id = $1`,
      values
    )
    .then(() => true)
    .catch((err) => err);
};

module.exports = {
  getAllQuestions,
  getAllAnswers,
  postQuestion,
  postAnswer,
  putQuestionHelpful,
  putQuestionsReported,
  putAnswerHelpful,
  putAnswerReported,
};
