const router = require('express').Router();

const database = require('../db');

/**
 * @api {GET} /history              get all anime search history from mongodb
 * @apiExample                      localhost:8888/history
 */
router.get('/', async (req, res) => {
    try {
        const results = await database.find('History');
        res.json(results);
    } catch (error) {
        res.status(500).json(error.toString());
    }
});

module.exports = router;