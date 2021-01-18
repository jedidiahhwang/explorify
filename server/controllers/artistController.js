const {default: axios} = require("axios");

module.exports = {
    getArtist: async (req, res) => {

        const {accessToken, genre} = req.body;

        await axios({
            url: "https://api.spotify.com/v1/search?q=genre%3A%20" + genre + "&type=artist&market=US&limit=1", 
            headers: {
                "Authorization" : "Bearer " + accessToken,
            },
            method: "GET"
        })
            .then(artists => {
                res.status(200).send(artists.data);
            })
            
    },
    getRelatedArtists: async (req, res) => {

        const {accessToken, id} = req.body;

        await axios({
            url: "https://api.spotify.com/v1/artists/" + id + "/related-artists", 
            headers: {
                "Authorization" : "Bearer " + accessToken,
            },
            method: "GET"
        })
            .then(artists => {
                res.status(200).send(artists.data);
            })
    },
    changeRating: (req, res) => {

    },
    changeComment: (req, res) => {

    }
}