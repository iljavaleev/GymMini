DROP TABLE IF EXISTS endurance CASCADE;
DROP TABLE IF EXISTS strength CASCADE;


CREATE TABLE endurance(
    id SERIAL PRIMARY KEY,
    exercise TEXT,
    reps varchar(32),
    superset int,
    work_id int NOT NULL,
    week_id int NOT NULL
);

CREATE TABLE strength(
    id SERIAL PRIMARY KEY,
    exercise TEXT,
    reps varchar(32),
    work_id int NOT NULL,
    week_id int NOT NULL
);
