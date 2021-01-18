require("dotenv").config();
const { default: axios } = require("axios");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const querystring = require("querystring");
const dotenv = require("dotenv");

const clientID = process.env.clientID;
const clientSecret = process.env.clientSecret;

module.exports = {
    register: async (req, res) => {
        const db = req.app.get("db");

        // Receive the needed info (name, password) from req.body.
        const {username, email, password} = req.body;
        
        // Assigns the first item in the array to the variable existingUser
        const [existingUser] = await db.get_user_by_username([username]);
        
        // Check if they are already registered. If they are, reject the request.
        if(existingUser) {
            return res.status(409).send("User already exists");
        }
        
        // Hash and salt the password.
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        
        // Insert them into the database.
        const [newUser] = await db.register_user([username, email, hash]);
        
        // Attach that user to the session.
        req.session.user = newUser;
        
        // Send confirmation of registration.
        res.status(200).send(newUser);
    },
    login: async (req, res) => {
        const db = req.app.get("db");

        // Get necessary info off of req.body (username)
        const {username, password} = req.body;

        // Check if user exists, and if they do not, reject the request.
        const [existingUser] = await db.get_user_by_username([username]);

        if(!existingUser) {
            return res.status(404).send("User does not exist");
        }

        // Check their password against the hash, if there is a mismatch, reject the request.
        const isAuthenticated = bcrypt.compareSync(password, existingUser.hash);

        if(!isAuthenticated) {
            return res.status(403).send("Incorrect password");
        }

        // Delete the hash from the user object.
        delete existingUser.hash;

        // Attach the user to the session.
        req.session.user = existingUser;

        // Send back confirmation of login.
        res.status(200).send(existingUser);
    },
    getUserSession: (req, res) => {
        if(req.session.user) {
            res.status(200).send(req.session.user);
        } else {
            res.status(404).send("No session found");
        }
    },
    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    },
    sendEmail: (req, res) => {

        const {username, email, password} = req.body;

        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "explorify.application@gmail.com",
                pass: "jeddy950718"
            }
        })

        let mailOptions = {
            from : "explorify.application@gmail.com",
            to: email,
            subject: "Welcome to Explorify",
            text: `Welcome! Your username is: ${username} and your password is: ${password}`
        }

        transporter.sendMail(mailOptions, function(err, data) {
            if(err) {
                console.log("Error occurs")
            } else {
                console.log("Email sent")
            }
        })
    },
    getToken: async (req, res) => {
        await axios({
            url: "https://accounts.spotify.com/api/token", 
            headers: {
                "Authorization" : "Basic " + Buffer.from(clientID + ":" + clientSecret).toString("base64"),
                "Content-Type" : "application/x-www-form-urlencoded",
            },
            data: querystring.stringify({grant_type : "client_credentials"}),
            method: "POST"
        })
            .then(token => {
                res.status(200).send(token.data.access_token);
            })
    }
}