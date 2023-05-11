const superagent = require('superagent');
const base = 'https://api.jikan.moe/v4/';

// example of searching for 'stone' https://api.jikan.moe/v4/anime?q=stone
// We can also add &sfw at the end, assuming this filters possible nsfw content tagged 18+ in the db 
// search for anime by name
const findAnimeLike = async (searchTerm) => {
    try {
        const searchURL = `${base}anime?q=${searchTerm}&sfw`;
        const res = await superagent.get(searchURL);

        return res.body;
    } catch (error) {
        console.log(error);
    }
};

const findAnimeByID = async (id) => {
    try {

        const searchURL = `${base}anime/${id}`;
        const res = await superagent.get(searchURL);

        return res.body;

    } catch (error) {
        console.log(error);
    }

};


module.exports = {
    //same as if you did findAnimeLike : findAnimeLike
    findAnimeLike,
    findAnimeByID
};