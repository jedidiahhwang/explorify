import React, {useState} from "react";
import axios from "axios";

import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {loginUser} from "../dux/userReducer";
import {setAccessToken} from "../dux/tokenReducer";

const Login = (props) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const login = ((e) => {
        e.preventDefault();

        axios
            .post("/auth/token")
            .then((res) => {
                console.log(res.data);
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

    return (
        <div className="login">
            <p className="login-headers"> Login </p>
            <form id="login-form">
                <h5 className="login-subheaders"> What's your username? </h5>
                <input
                    className="input username"
                    placeholder="username"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <h5 className="login-subheaders"> What's your password? </h5>
                <input
                    className="input password"
                    placeholder="password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </form>
            <div className="button-holder">
                <Link to="/">
                    <button className="login-button"> Back </button>
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-back" width="60" height="60" viewBox="0 0 24 24" stroke-width="2" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M9 11l-4 4l4 4m-4 -4h11a4 4 0 0 0 0 -8h-1" />
                        </svg>
                </Link>
                    <button className="login-button" onClick={login}> Login </button>
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-forward" width="60" height="60" viewBox="0 0 24 24" stroke-width="2" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M15 11l4 4l-4 4m4 -4h-11a4 4 0 0 1 0 -8h1" />
                        </svg>
            </div>
        </div>
    )
}

function mapStateToProps(reduxState) {
    return {...reduxState.user, ...reduxState.token};
}

export default connect(mapStateToProps, {setAccessToken, loginUser})(Login)