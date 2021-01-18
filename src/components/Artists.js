import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {logout} from "../dux/userReducer";

const Artists = (props) => {

    console.log(props.genre[0].addedgenre);
    const genre = props.genre[0].addedgenre;
    console.log(props.username);
    
    const [retrievedArtists, setRetrievedArtists] = useState([]);
    const [retrievedRelatedArtists, setRetrievedRelatedArtists] = useState([]);
    
    useEffect(() => {
        
        axios
            .post("/api/artist", {
                accessToken: props.accessToken,
                genre: String(props.genre[0].addedgenre)
            }) // Pass the token through a param or a query
            .then((res) => {

                const artists = res.data.artists.items.map((e) => ({
                    images: e.images,
                    genres: e.genres,
                    name: e.name,
                    external_urls: e.external_urls.spotify,
                    id: e.id
                }))
                console.log(res.data);
                setRetrievedArtists(artists);

                axios
                    .post("/api/relatedArtists", {
                        accessToken: props.accessToken,
                        id: String(artists[0].id)
                    })
                    .then((res) => {

                        const relatedArtists = res.data.artists.map((e) => ({
                            images: e.images,
                            genres: e.genres,
                            name: e.name,
                            external_urls: e.external_urls.spotify
                        }))
                        console.log(res.data);
                        console.log(res.data.artists[0]);
                        setRetrievedRelatedArtists(relatedArtists);
                    })

            })
    }, [])

    const logout = ((e) => {
        e.preventDefault();

        axios
            .get("/auth/logout")
            .then(() => {
                props.logout();
                props.history.push("/login");
            });
    })

    return (
        <div className="artists">
            <div id="header-container">
                    <header className="artists-header">
                        <div id="genre-container">
                            <h2 className="header-sub">Genre - {genre.charAt(0).toUpperCase() + genre.slice(1)}</h2>
                        </div>
                        <div id="user-container">
                            <h2 className="header-sub">Welcome, {props.username}</h2>
                            <button className="logout genre-button" onClick={logout}>Logout</button>
                        </div>
                    </header>
            </div>
            {retrievedArtists.length > 0 && (
                <div id="primary-artist-container">
                    <h1 className="artist-header">Selected Artist</h1>
                    <img id="primary-artist-image" src={retrievedArtists[0].images[0].url} />
                        <p className="primary-artist-text">{retrievedArtists[0].name}</p>
                        <p className="primary-artist-text">Genres: {retrievedArtists[0].genres}</p>
                        <Link className="primary-artist-text">{retrievedArtists[0].external_urls}</Link>
                </div>
            )}
            {retrievedRelatedArtists.length > 0 && (
                <div id="related-artist-container">
                    <h3 className="artist-subheader">Other Artists You Might Like</h3>
                    <img className="artist-image" src={retrievedRelatedArtists[0].images[0].url} />
                        <p>{retrievedRelatedArtists[0].name}</p>
                        <p>Genres: </p>
                        <p>{retrievedRelatedArtists[0].genres}</p>
                        <Link className="artist-text">{retrievedRelatedArtists[0].external_urls}</Link>
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-link" width="60" height="60" viewBox="0 0 24 24" stroke-width="2" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M10 14a3.5 3.5 0 0 0 5 0l4 -4a3.5 3.5 0 0 0 -5 -5l-.5 .5" />
                            <path d="M14 10a3.5 3.5 0 0 0 -5 0l-4 4a3.5 3.5 0 0 0 5 5l.5 -.5" />
                        </svg>  
                    <img className="artist-image" src={retrievedRelatedArtists[1].images[0].url} />
                        <p>{retrievedRelatedArtists[1].name}</p>
                        <p>Genres: {retrievedRelatedArtists[1].genres}</p>
                        <Link className="artist-text">{retrievedRelatedArtists[1].external_urls}</Link>
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-link" width="60" height="60" viewBox="0 0 24 24" stroke-width="2" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M10 14a3.5 3.5 0 0 0 5 0l4 -4a3.5 3.5 0 0 0 -5 -5l-.5 .5" />
                            <path d="M14 10a3.5 3.5 0 0 0 -5 0l-4 4a3.5 3.5 0 0 0 5 5l.5 -.5" />
                        </svg>
                    <img className="artist-image" src={retrievedRelatedArtists[2].images[0].url} />
                        <p>{retrievedRelatedArtists[2].name}</p>
                        <p>Genres: {retrievedRelatedArtists[2].genres}</p>
                        <Link className="artist-text">{retrievedRelatedArtists[2].external_urls}</Link>
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-link" width="60" height="60" viewBox="0 0 24 24" stroke-width="2" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M10 14a3.5 3.5 0 0 0 5 0l4 -4a3.5 3.5 0 0 0 -5 -5l-.5 .5" />
                            <path d="M14 10a3.5 3.5 0 0 0 -5 0l-4 4a3.5 3.5 0 0 0 5 5l.5 -.5" />
                        </svg>
                    <img className="artist-image" src={retrievedRelatedArtists[3].images[0].url} />
                        <p>{retrievedRelatedArtists[3].name}</p>
                        <p>Genres: {retrievedRelatedArtists[3].genres}</p>
                        <Link className="artist-text">{retrievedRelatedArtists[3].external_urls}</Link>
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-link" width="60" height="60" viewBox="0 0 24 24" stroke-width="2" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M10 14a3.5 3.5 0 0 0 5 0l4 -4a3.5 3.5 0 0 0 -5 -5l-.5 .5" />
                            <path d="M14 10a3.5 3.5 0 0 0 -5 0l-4 4a3.5 3.5 0 0 0 5 5l.5 -.5" />
                        </svg>
                    <img className="artist-image" src={retrievedRelatedArtists[4].images[0].url} />
                        <p>Genres: {retrievedRelatedArtists[4].genres}</p>
                        <Link className="artist-text">{retrievedRelatedArtists[4].external_urls}</Link>
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-link" width="60" height="60" viewBox="0 0 24 24" stroke-width="2" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M10 14a3.5 3.5 0 0 0 5 0l4 -4a3.5 3.5 0 0 0 -5 -5l-.5 .5" />
                            <path d="M14 10a3.5 3.5 0 0 0 -5 0l-4 4a3.5 3.5 0 0 0 5 5l.5 -.5" />
                        </svg>
                </div>
            )}
        </div>
    )
}

function mapStateToProps(reduxState) {
    return {...reduxState.user, ...reduxState.genre, ...reduxState.token};
}

export default connect(mapStateToProps, {logout})(Artists)
