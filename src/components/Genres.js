import React, {useEffect, useState} from "react";
import axios from "axios";
import {connect} from "react-redux";
import {logout} from "../dux/userReducer";
import {setAccessToken} from "../dux/tokenReducer";
import Dropdown from "./Dropdown";

const Genres = (props) => {

    console.log(props);

    const [spotifyGenres, setSpotifyGenres] = useState([]);
    const [token, setToken] = useState("");

    

    // This function is needed for the app to wait for the API call before rendering components
    async function getGenres(result) {
        await axios({
            url: "https://api.spotify.com/v1/recommendations/available-genre-seeds", 
            headers: {
                "Authorization" : "Bearer " + result,
            },
            method: "GET"
        })
            .then(genreResponse => {
                setSpotifyGenres(genreResponse.data.genres);
                setToken(result);
            })
            
        }
        
        useEffect(() => {
            let isMounted = true;
            axios
                .post("/auth/token")
                .then((res) => {
                    if(isMounted) {
                        getGenres(res.data);
                        console.log(res.data);
                        props.setAccessToken(res.data);
                    }
            })
    }, [])

    const logout = ((e) => {
        e.preventDefault();

        axios
            .get("/auth/logout")
            .then(() => {
                props.logout()
                props.history.push("/");
            });
    })

    return (
        <div className="genres">
                {token && spotifyGenres.length > 0 ? 
                    <div className="genres-holder">
                        <h1 className="genres-headers">Select a genre</h1>
                        <Dropdown options={spotifyGenres} />
                        <button className="logout genre-button" onClick={logout}>Logout</button>
                    </div>
                 : null }
        </div>
    )
}

function mapStateToProps(reduxState) {
    return {...reduxState.user, ...reduxState.genre, ...reduxState.token};
}

export default connect(mapStateToProps, {logout, setAccessToken})(Genres)