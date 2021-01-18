import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {withRouter} from "react-router-dom";

const Home = (props) => {
    return (
        <div className="home">
            <hgroup className="welcome-text">
                <h1 id="explorify-main">Explorify</h1>
                <h3 id="explorify-sub">Discover something new</h3>
            </hgroup>
            <div className="button-holder">
                <Link to="/login">
                    <button className="home-button">Login</button> {/* Route to the login page */}
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-login" width="60" height="60" viewBox="0 0 24 24" stroke-width="2" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                        <path d="M20 12h-13l3 -3m0 6l-3 -3" />
                    </svg>
                </Link>
                <Link to="/register">
                    <button className="home-button">Register</button> {/* Route to the register page */}
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-registered" width="60" height="60" viewBox="0 0 24 24" stroke-width="2" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <circle cx="12" cy="12" r="9" />
                        <path d="M9 16v-8h4a2 2 0 0 1 0 4h-4m3 0l3 4" />
                    </svg>
                </Link>
            </div>
            <Link to="/about">
                <a class="arrow-link">See more<span class="arrow"></span></a>
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-question-mark" width="60" height="60" viewBox="0 0 24 24" stroke-width="2" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M8 8a3.5 3 0 0 1 3.5 -3h1a3.5 3 0 0 1 3.5 3a3 3 0 0 1 -2 3a3 4 0 0 0 -2 4" />
                    <line x1="12" y1="19" x2="12" y2="19.01" />
                </svg>
            </Link>
        </div>   
    )
}

export default withRouter(Home)