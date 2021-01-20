require("dotenv").config();
const express = require("express");
const session = require("express-session");
const massive = require("massive");

const authCtrl = require("./controllers/authController");
const genreCtrl = require("./controllers/genreController");
const artistCtrl = require("./controllers/artistController");
const { request } = require("request");

const path = require("path");

const app = express();

const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;

// Middleware
app.use(express.json());

app.use(
    session({
        resave: false,
        saveUninitialized: true,
        secret: SESSION_SECRET,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7
        }
    })
);

app.use(express.static(__dirname + "/../build"))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "../build/index.html"))
})

// Auth endpoints
app.post("/auth/register", authCtrl.register);
app.post("/auth/login", authCtrl.login);
app.get("/auth/user", authCtrl.getUserSession);
app.get("/auth/logout", authCtrl.logout);
app.post("/auth/email", authCtrl.sendEmail);
app.post("/auth/token", authCtrl.getToken);

// Genre endpoints
app.get("/api/getGenres", genreCtrl.getGenres);
app.post("/api/addGenre", genreCtrl.addGenre);

// Artist endpoints
app.post("/api/artist", artistCtrl.getArtist);
app.post("/api/relatedArtists", artistCtrl.getRelatedArtists);
app.put("/api/rate/:artist_id", artistCtrl.changeRating);
app.put("/api/comment/:artist_id", artistCtrl.changeComment);

// Use massive to connect node application to database
massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then(dbInstance => {
    app.set("db", dbInstance)
    console.log(`DB is ready`)
    app.listen(SERVER_PORT, () => console.log(`Server is ready on port ${SERVER_PORT}`))
})

