module.exports = {
    getGenres: async (req, res) => {
        // const token = req.body;

        axios({
            url: "https://api.spotify.com/v1/browse/categories?locale=sv_US", 
            headers: {
                "Authorization" : "Bearer " + `${token}`,
            },
            method: "GET"
        })
            .then(genreResponse => {
                res.status(200).send(genreResponse.data.categories.items);
            })
    },
    addGenre: async (req, res) => {
        const db = req.app.get("db");

        // Key has to be the same name for destructuring
        // Same as const addedGenre = req.body.selectedValue
        const {selectedValue} = req.body;
        const userGenre = await db.add_genre([selectedValue]);

        return res.status(200).send(userGenre);
    }
}