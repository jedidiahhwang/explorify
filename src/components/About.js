import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const About = (props) => {
    

    return (
        <div className="about">
            <h1 className="about-headers">What is Explorify?</h1>
                    <p className="text-block">
                        Explorify is a music exploration tool that is intended to
                        expose users to different genres of music. Working similarly
                        to other established streaming services, Explorify will highlight
                        popular and up-and-coming artists while referencing users
                        to similar artists.
                    </p>
                <br/>
            <br/>
            <h1 className="about-headers">How does Explorify work?</h1>
                    <p className="text-block">
                        Explorify uses a combination of JavaScript, SASS, Node (npm), and PostgreSQL as well
                        as Spotify's public API to access data related to artists
                        and genres. Users will create an account that will save information
                        such as ratings and comments of artists that can be revisited at a later time.
                    </p>
                <br/>
            <br/>
            <h1 className="about-headers">Why was this project made?</h1>
                    <p className="text-block">
                        This project was manufactured as part of the Devmountain web development
                        curriculum, but was fueled by a desire to learn API implementation
                        in a field of music.
                    </p>
            <div className="button-holder">
                <Link to="/">
                    <button className="about-button">Back</button>
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-left" width="60" height="60" viewBox="0 0 24 24" stroke-width="2" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <line x1="5" y1="12" x2="11" y2="18" />
                        <line x1="5" y1="12" x2="11" y2="6" />
                    </svg>
                </Link>
                <Link to="/register">
                    <button className="about-button">Let's go!</button>
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-registered" width="60" height="60" viewBox="0 0 24 24" stroke-width="2" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <circle cx="12" cy="12" r="9" />
                        <path d="M9 16v-8h4a2 2 0 0 1 0 4h-4m3 0l3 4" />
                    </svg>
                </Link>
            </div>
        </div>   
    )
}

export default About