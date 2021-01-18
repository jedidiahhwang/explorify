import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const Register = (props) => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const register = ((e) => {
        e.preventDefault();

        axios.post("/auth/register", {username, email, password});
        axios.post("/auth/sendEmail", {username, email, password});
    })

    return (
        <div className="registration">
            <p className="register-headers"> Create an account</p>
            <form id="register-form">
                <h5 className="register-subheaders"> What's your username? </h5>
                <input
                    className="input username"
                    placeholder="username"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <h5 className="register-subheaders"> What's your gmail? </h5>
                <input
                    className="input email"
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <h5 className="register-subheaders"> What's your password? </h5>
                <input
                    className="input password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </form>
            <div className="button-holder">
                <Link to="/">
                    <button className="register-button">Back</button>
                </Link>
                    <button className="register-button" onClick={register}>Register</button>
            </div>
        </div>
    )
}
export default Register