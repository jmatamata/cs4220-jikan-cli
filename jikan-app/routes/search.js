const router = require('express').Router();

const database = require('../db');
const jikan = require('jikan-module');

/**
 * @description                 format the card array response
 * @param {Array} animeList     array of animes
 * @return {Array}              array of anime objects with formatted output for final
 */
const _formatAnimes = (animeList) => {
    return animeList.map((anime) => {
        return {
            display: `${anime.title} | ${anime.episodes ? anime.episodes : 0} episodes`,
            id: anime.mal_id
        };
    });
};

/**
 * @api {GET} /search               search for anime with searchTerm
 * @apiQuery {String} name          query to use for jikan
 * @apiExample                      localhost:8888/search?name=dragon
 */
router.get('/', async (req, res) => {
    try {
        const { query } = req;
        const { name = 'a' } = query;   // searches 'a' if no parameter is provided

        const jikanRaw = await jikan.findAnimeLike(name);
        const animeList = _formatAnimes(jikanRaw.data);

        const searchOutput = { searchTerm: name, results: animeList };

        res.json(searchOutput);

        database.save('History', { 
            searchTerm: searchOutput.searchTerm,
            searchCount: animeList.length,
            lastSearched: new Date()
         });
    } catch (error) {
        res.status(500).json(error.toString());
    }
});

/**
 * @api {GET} /search/{id}/details        search for anime with the ID
 * @apiQuery {Int} searched               query to use for jikan
 * @apiExample                            localhost:8888/search/{id}/details?searchterm={search term}
 */
router.get('/:id/details', async (req, res) => {
    try {
        const { query } = req;
        const { searchterm } = query;   
        const id = req.params.id; // searches from :id
        console.log(id);
        console.log(searchterm);

        const jikanRaw = await jikan.findAnimeByID(id);

        const genres = [];
        jikanRaw.data.genres.forEach(genre => {
            genres.push(genre.name);
        });

        res.json({
            URL : jikanRaw.data.url,
            Title : jikanRaw.data.title,
            'User Score' : jikanRaw.data.score,
            'English Title' : jikanRaw.title_english,
            Synopsis : jikanRaw.data.synopsis,
            genres
        });

        // database.save('History', { 
        //     searchTerm: searchOutput.searchTerm,
        //     searchCount: animeList.length,
        //     lastSearched: new Date()
        //  });
    } catch (error) {
        res.status(500).json(error.toString());
    }
});

module.exports = router;