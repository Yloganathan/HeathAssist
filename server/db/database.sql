-- noinspection SqlNoDataSourceInspectionForFile

DROP DATABASE IF EXISTS health_assist;
CREATE DATABASE health_assist;
\c health_assist;

CREATE TABLE user_table(
  ID SERIAL PRIMARY KEY,
  Name TEXT,
  Email TEXT
);

CREATE TABLE daily_log (
    ID SERIAL PRIMARY KEY,
    Date DATE,
    Time TIME,
    Weight INTEGER,
    FatPercent INTEGER,
    DietNotes TEXT,
    WorkoutNotes TEXT,
    CreatedAt TIMESTAMP DEFAULT current_timestamp,
    UpdatedAt TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE user_log (
  ID SERIAL PRIMARY KEY,
  UserId INTEGER references user_table(ID),
  dailylog INTEGER references daily_log(ID),
  CreatedAt TIMESTAMP DEFAULT current_timestamp,
  UpdatedAt TIMESTAMP DEFAULT current_timestamp,
  DeletedAt TIMESTAMP DEFAULT NULL
);