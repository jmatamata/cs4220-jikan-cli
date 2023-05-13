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
            display: `${anime.title} (${anime.aired.from}-${anime.aired.to})`,
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

        database.save('History', { ...searchOutput });
    } catch (error) {
        res.status(500).json(error.toString());
    }
});

module.exports = router;