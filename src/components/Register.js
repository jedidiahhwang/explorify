import React, {useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {loginUser} from "../dux/userReducer";
import {setAccessToken} from "../dux/tokenReducer";

const Register = (props) => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const register = ((e) => {
        e.preventDefault();

        axios
            .post("/auth/register", {username, email, password})
            .then((res) => {
                axios
                    .post("/auth/token")
                    .then((res) => {
                        if(res.data) {
                            props.setAccessToken(res.data);
                        }
                    })

                axios
                    .post("/auth/login", {username, password})
                    .then((res) => {
                        props.loginUser(res.data)
                        props.history.push("/genres")
                    })
            })
        axios.post("/auth/email", {username, email, password});
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
                    type="password"
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

function mapStateToProps(reduxState) {
    return {...reduxState.user, ...reduxState.token};
}

export default connect(mapStateToProps, {setAccessToken, loginUser})(Register)