DROP DATABASE IF EXISTS health_assist;
CREATE DATABASE health_assist;
\c health_assist;

CREATE TABLE sample (
    ID SERIAL PRIMARY KEY,
    Name VARCHAR,
    CreatedAt TIMESTAMP DEFAULT current_timestamp,
    UpdatedAt TIMESTAMP DEFAULT current_timestamp
);