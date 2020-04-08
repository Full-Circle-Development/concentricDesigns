DROP DATABASE IF EXISTS qa;

CREATE DATABASE qa;

\c qa;

CREATE TABLE questions (
    id SERIAL PRIMARY KEY NOT NULL,
    product_id INT NOT NULL,
    body VARCHAR(1000) NOT NULL,
    date_written DATE,
    asker_name VARCHAR(60) NOT NULL,
    asker_email VARCHAR(60) NOT NULL,
    reported INT,
    helpful INT
);

CREATE TABLE answers (
    id SERIAL PRIMARY Key,
    question_id INT REFERENCES questions(id),
    body VARCHAR(1000) NOT NULL,
    date_written DATE,
    answerer_name VARCHAR(60) NOT NULL,
    answerer_email VARCHAR(60) NOT NULL,
    reported INT NOT NULL,
    helpful INT NOT NULL
);

CREATE TABLE answers_photos (
    id SERIAL PRIMARY KEY,
    answer_id INT REFERENCES answers(id),
    url TEXT
);