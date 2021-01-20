import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {logout} from "../dux/userReducer";

const Artists = (props) => {

    const genre = props.genre[0].addedgenre;
    
    const [retrievedArtists, setRetrievedArtists] = useState([]);
    const [retrievedRelatedArtists, setRetrievedRelatedArtists] = useState([]);
    const [overlayDisplay, setOverlayDisplay] = useState(false);
    const [artistNumber, setArtistNumber] = useState();
    
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
                    href: e.href,
                    popularity: e.popularity,
                    followers: e.followers,
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
                            href: e.href,
                            popularity: e.popularity,
                            followers: e.followers,
                            external_urls: e.external_urls.spotify
                        }))
                        console.log(res.data);
                        console.log(res.data.artists[0]);
                        setRetrievedRelatedArtists(relatedArtists);
                    })
            })
    }, [])

    console.log(retrievedRelatedArtists[0]);

    const logout = ((e) => {
        e.preventDefault();

        axios
            .get("/auth/logout")
            .then(() => {
                props.logout();
                props.history.push("/");
            });
    })


    const turnOn0 = (e) => {
        e.stopPropagation();
        setOverlayDisplay(true);
        setArtistNumber(0);
    }

    const turnOn1 = (e) => {
        e.stopPropagation();
        setOverlayDisplay(true);
        setArtistNumber(1);
    }

    const turnOn2 = (e) => {
        e.stopPropagation();
        setOverlayDisplay(true);
        setArtistNumber(2);
    }

    const turnOn3 = (e) => {
        e.stopPropagation();
        setOverlayDisplay(true);
        setArtistNumber(3);
    }

    const turnOn4 = (e) => {
        e.stopPropagation();
        setOverlayDisplay(true);
        setArtistNumber(4);
    }

    const turnOn5 = (e) => {
        e.stopPropagation();
        setOverlayDisplay(true);
        setArtistNumber(5);
    }

    const turnOn6 = (e) => {
        e.stopPropagation();
        setOverlayDisplay(true);
        setArtistNumber(6);
    }

    const turnOff = (e) => {
        e.stopPropagation();
        setOverlayDisplay(false);
    }

    return (
        <div className="artists">
            <div id="header-container">
                    <header className="artists-header">
                        <div id="genre-container">
                            <h2 className="header-sub">{genre.charAt(0).toUpperCase() + genre.slice(1)}</h2>
                        </div>
                        <div id="user-container">
                            <h2 className="header-sub">Welcome, {props.username}</h2>
                            <button className="logout artists-button" onClick={logout}>Logout</button>
                        </div>
                    </header>
            </div>
            {retrievedArtists.length > 0 && (
                <div id="primary-artist-container" onClick={turnOn0}>
                    <h1 className="artist-header">Selected Artist</h1>
                    <img id="primary-artist-image" src={retrievedArtists[0].images[0].url} />
                    <p className="primary-artist-text">{retrievedArtists[0].name}</p>
                    {overlayDisplay && artistNumber === 0 ? 
                        <div id="overlay" onClick={turnOff}>
                            <img className="overlay-primary-artist-image" src={retrievedArtists[0].images[0].url} />
                            <div className="extra-info">
                                <p className="extra-artist-text">Artist: {retrievedArtists[0].name}</p>
                                <p className="extra-artist-text">Genres: {retrievedArtists[0].genres}</p>
                                <p className="extra-artist-text">Popularity: {retrievedArtists[0].popularity}</p>
                                <p className="extra-artist-text">Followers: {retrievedArtists[0].followers.total}</p>
                                <a className="extra-artist-text" href={retrievedArtists[0].external_urls}>Artist Page</a>
                            </div>
                        </div> 
                    : null}
                </div>
            )}
            <h3 className="artist-subheader">Other Artists You Might Like</h3>
            {retrievedRelatedArtists.length > 0 && (
                <div id="related-artist-container" onClick={turnOn1}>
                    <div className="indiv-artist">
                        <img className="artist-image" src={retrievedRelatedArtists[0].images[0].url} />
                            <p className="related-artist-text">{retrievedRelatedArtists[0].name}</p>
                            {overlayDisplay && artistNumber === 1 ?
                                <div id="overlay" onClick={turnOff}>
                                <img className="related-artist-image" src={retrievedRelatedArtists[0].images[0].url} />
                                    <div className="extra-info">
                                        <p className="extra-artist-text">Artist: {retrievedRelatedArtists[0].name}</p>
                                        <p className="extra-artist-text">Genres: {retrievedRelatedArtists[0].genres}</p>
                                        <p className="extra-artist-text">Popularity: {retrievedRelatedArtists[0].popularity}</p>
                                        <p className="extra-artist-text">Followers: {retrievedRelatedArtists[0].followers.total}</p>
                                        <a className="extra-artist-text" href={retrievedRelatedArtists[0].external_urls}>Artist Page</a>
                                    </div>
                                </div> 
                            : null}
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-link" width="60" height="60" viewBox="0 0 24 24" stroke-width="2" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M10 14a3.5 3.5 0 0 0 5 0l4 -4a3.5 3.5 0 0 0 -5 -5l-.5 .5" />
                                <path d="M14 10a3.5 3.5 0 0 0 -5 0l-4 4a3.5 3.5 0 0 0 5 5l.5 -.5" />
                            </svg>
                    </div>
                    <div className="indiv-artist" onClick={turnOn2}>
                        <img className="artist-image" src={retrievedRelatedArtists[1].images[0].url} />
                            <p className="related-artist-text">{retrievedRelatedArtists[1].name}</p>
                            {overlayDisplay && artistNumber === 2 ?
                                <div id="overlay" onClick={turnOff}>
                                    <img className="related-artist-image" src={retrievedRelatedArtists[1].images[0].url} />
                                    <div className="extra-info">
                                        <p className="extra-artist-text">Artist: {retrievedRelatedArtists[1].name}</p>
                                        <p className="extra-artist-text">Genres: {retrievedRelatedArtists[1].genres}</p>
                                        <p className="extra-artist-text">Popularity: {retrievedRelatedArtists[1].popularity}</p>
                                        <p className="extra-artist-text">Followers: {retrievedRelatedArtists[1].followers.total}</p>
                                        <a className="extra-artist-text" href={retrievedRelatedArtists[1].external_urls}>Artist Page</a>
                                    </div>
                                </div> 
                            : null}
                            {/* <Link className="artist-text">{retrievedRelatedArtists[1].external_urls}</Link> */}
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-link" width="60" height="60" viewBox="0 0 24 24" stroke-width="2" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M10 14a3.5 3.5 0 0 0 5 0l4 -4a3.5 3.5 0 0 0 -5 -5l-.5 .5" />
                                <path d="M14 10a3.5 3.5 0 0 0 -5 0l-4 4a3.5 3.5 0 0 0 5 5l.5 -.5" />
                        </svg>
                    </div>
                    <div className="indiv-artist" onClick={turnOn3}>
                        <img className="artist-image" src={retrievedRelatedArtists[2].images[0].url} />
                            <p className="related-artist-text">{retrievedRelatedArtists[2].name}</p>
                            {overlayDisplay && artistNumber === 3 ?
                                <div id="overlay" onClick={turnOff}>
                                    <img className="related-artist-image" src={retrievedRelatedArtists[2].images[0].url} />
                                    <div className="extra-info">
                                        <p className="extra-artist-text">Artist: {retrievedRelatedArtists[2].name}</p>
                                        <p className="extra-artist-text">Genres: {retrievedRelatedArtists[2].genres}</p>
                                        <p className="extra-artist-text">Popularity: {retrievedRelatedArtists[2].popularity}</p>
                                        <p className="extra-artist-text">Followers: {retrievedRelatedArtists[2].followers.total}</p>
                                        <a className="extra-artist-text" href={retrievedRelatedArtists[2].external_urls}>Artist Page</a>
                                    </div>
                                </div> 
                            : null}
                            {/* <Link className="artist-text">{retrievedRelatedArtists[2].external_urls}</Link> */}
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-link" width="60" height="60" viewBox="0 0 24 24" stroke-width="2" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M10 14a3.5 3.5 0 0 0 5 0l4 -4a3.5 3.5 0 0 0 -5 -5l-.5 .5" />
                                <path d="M14 10a3.5 3.5 0 0 0 -5 0l-4 4a3.5 3.5 0 0 0 5 5l.5 -.5" />
                        </svg>
                    </div>
                    <div className="indiv-artist" onClick={turnOn4}>
                    <img className="artist-image" src={retrievedRelatedArtists[3].images[0].url} />
                        <p className="related-artist-text">{retrievedRelatedArtists[3].name}</p>
                        {overlayDisplay && artistNumber === 4 ?
                            <div id="overlay" onClick={turnOff}>
                                <img className="related-artist-image" src={retrievedRelatedArtists[3].images[0].url} />
                                <div className="extra-info">
                                    <p className="extra-artist-text">Artist: {retrievedRelatedArtists[3].name}</p>
                                    <p className="extra-artist-text">Genres: {retrievedRelatedArtists[3].genres}</p>
                                    <p className="extra-artist-text">Popularity: {retrievedRelatedArtists[3].popularity}</p>
                                    <p className="extra-artist-text">Followers: {retrievedRelatedArtists[3].followers.total}</p>
                                    <a className="extra-artist-text" href={retrievedRelatedArtists[3].external_urls}>Artist Page</a>
                                </div>
                            </div> 
                        : null}
                        {/* <Link className="artist-text">{retrievedRelatedArtists[3].external_urls}</Link> */}
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-link" width="60" height="60" viewBox="0 0 24 24" stroke-width="2" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M10 14a3.5 3.5 0 0 0 5 0l4 -4a3.5 3.5 0 0 0 -5 -5l-.5 .5" />
                            <path d="M14 10a3.5 3.5 0 0 0 -5 0l-4 4a3.5 3.5 0 0 0 5 5l.5 -.5" />
                        </svg>
                    </div>
                    <div className="indiv-artist" onClick={turnOn5}>
                    <img className="artist-image" src={retrievedRelatedArtists[4].images[0].url} />
                        <p className="related-artist-text">{retrievedRelatedArtists[4].name}</p>
                        {overlayDisplay && artistNumber === 5 ?
                            <div id="overlay" onClick={turnOff}>
                                <img className="related-artist-image" src={retrievedRelatedArtists[4].images[0].url} />
                                <div className="extra-info">
                                    <p className="extra-artist-text">Artist: {retrievedRelatedArtists[4].name}</p>
                                    <p className="extra-artist-text">Genres: {retrievedRelatedArtists[4].genres}</p>
                                    <p className="extra-artist-text">Popularity: {retrievedRelatedArtists[4].popularity}</p>
                                    <p className="extra-artist-text">Followers: {retrievedRelatedArtists[4].followers.total}</p>
                                    <a className="extra-artist-text" href={retrievedRelatedArtists[4].external_urls}>Artist Page</a>
                                </div>
                            </div> 
                        : null}
                        {/* <Link className="artist-text">{retrievedRelatedArtists[4].external_urls}</Link> */}
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-link" width="60" height="60" viewBox="0 0 24 24" stroke-width="2" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M10 14a3.5 3.5 0 0 0 5 0l4 -4a3.5 3.5 0 0 0 -5 -5l-.5 .5" />
                            <path d="M14 10a3.5 3.5 0 0 0 -5 0l-4 4a3.5 3.5 0 0 0 5 5l.5 -.5" />
                        </svg>
                    </div>
                    <div className="indiv-artist" onClick={turnOn6}>
                    <img className="artist-image" src={retrievedRelatedArtists[5].images[0].url} />
                        <p className="related-artist-text">{retrievedRelatedArtists[5].name}</p>
                        {overlayDisplay && artistNumber === 6 ?
                            <div id="overlay" onClick={turnOff}>
                                <img className="related-artist-image" src={retrievedRelatedArtists[5].images[0].url} />
                                <div className="extra-info">
                                    <p className="extra-artist-text">Artist: {retrievedRelatedArtists[5].name}</p>
                                    <p className="extra-artist-text">Genres: {retrievedRelatedArtists[5].genres}</p>
                                    <p className="extra-artist-text">Popularity: {retrievedRelatedArtists[5].popularity}</p>
                                    <p className="extra-artist-text">Followers: {retrievedRelatedArtists[5].followers.total}</p>
                                    <a className="extra-artist-text" href={retrievedRelatedArtists[5].external_urls}>Artist Page</a>
                                </div>
                            </div> 
                        : null}
                        {/* <Link className="artist-text">{retrievedRelatedArtists[4].external_urls}</Link> */}
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-link" width="60" height="60" viewBox="0 0 24 24" stroke-width="2" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M10 14a3.5 3.5 0 0 0 5 0l4 -4a3.5 3.5 0 0 0 -5 -5l-.5 .5" />
                            <path d="M14 10a3.5 3.5 0 0 0 -5 0l-4 4a3.5 3.5 0 0 0 5 5l.5 -.5" />
                        </svg>
                    </div>
                </div>
            )}
        </div>
    )
}

function mapStateToProps(reduxState) {
    return {...reduxState.user, ...reduxState.genre, ...reduxState.token};
}

export default connect(mapStateToProps, {logout})(Artists)
