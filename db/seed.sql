CREATE TABLE explorify_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50),
    hash text
);

CREATE TABLE explorify_user_genres (
    id SERIAL PRIMARY KEY,
    genreID INTEGER REFERENCES explorify_users(id),
    addedGenre TEXT
);

CREATE TABLE ratings (
    id SERIAL PRIMARY KEY,
    -- Artist ID
    userID INTEGER REFERENCES users(id),
    rating VARCHAR(1)
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    -- Artist ID
    userID INTEGER REFERENCES users(id),
    comment VARCHAR(250)
);