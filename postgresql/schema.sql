DROP DATABASE IF EXISTS qa;

CREATE DATABASE qa;

\c qa;

CREATE TABLE questions (
    question_id SERIAL PRIMARY KEY NOT NULL,
    product_id INT NOT NULL,
    question_body VARCHAR(1000) NOT NULL,
    question_date DATE,
    asker_name VARCHAR(60) NOT NULL,
    asker_email VARCHAR(60) NOT NULL,
    question_helpfulness INT, -- I changed helpfulness to question_helpfulness
    reported INT
);

CREATE TABLE answers (
    answer_id SERIAL PRIMARY Key NOT NULL,
    answer_question_id INT REFERENCES questions(question_id),
    body VARCHAR(1000) NOT NULL,
    date DATE,
    answerer_name VARCHAR(60) NOT NULL,
    answerer_email VARCHAR(60) NOT NULL,
    answer_helpfulness INT,
    reported INT
);

CREATE TABLE answers_photos (
    photo_id SERIAL PRIMARY KEY NOT NULL,
    photo_answer_id INT REFERENCES answers(answer_id),
    url TEXT
);

