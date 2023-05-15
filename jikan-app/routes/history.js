const router = require('express').Router();

const database = require('../db');

/**
 * @api {GET} /history              get all anime search history from mongodb
 * @apiQuery {String} search        query to use for jikan
 * @apiExample                      localhost:8888/history
 */
router.get('/', async (req, res) => {
    try {
        const { query } = req;
        const { search } = query;   // searches 'a' if no parameter is provided

        let results = [];

        if (search) {
            //console.log(`A user is searching for ${search}`);
            results = await database.find('History',search);
        } else {
            //console.log('A user wants to see all history');
            results = await database.find('History');
        }

        
        res.json(results);
    } catch (error) {
        res.status(500).json(error.toString());
    }
});

module.exports = router;