DROP DATABASE IF EXISTS qa;

CREATE DATABASE qa;

\c qa;

CREATE TABLE questions (
    question_id SERIAL PRIMARY KEY,
    product_id INT,
    question_body VARCHAR(1000) NOT NULL,
    question_date_written DATE,
    question_asker_name VARCHAR(60) NOT NULL,
    question_asker_email VARCHAR(60) NOT NULL,
    question_reported INT NOT NULL,
    question_helpful INT NOT NULL
);

CREATE TABLE answers (
    answer_id SERIAL PRIMARY Key,
    question_id INT REFERENCES questions(question_id),
    answer_body VARCHAR(1000) NOT NULL,
    answer_date_written DATE,
    answer_name VARCHAR(60) NOT NULL,
    answer_email VARCHAR(60) NOT NULL,
    answer_reported INT NOT NULL,
    answer_helpful INT NOT NULL,
);

CREATE TABLE answers_photos (
    answer_photo_id SERIAL PRIMARY KEY,
    answer_photo_answers_id INT REFERENCES answers(answer_id),
    answer_photo_url TEXT[5]
);