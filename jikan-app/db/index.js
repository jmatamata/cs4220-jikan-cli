const { MongoClient } = require('mongodb');

const config = require('../config.json');

/**
 * @description         es6 style module to support mongo connection adn crud operations
 * @return {Object}     object containing functions
 */
const mongo = () => {
    const mongoURL = `mongodb+srv://${config.username}:${config.password}@jikanappcluster.rdccmzp.mongodb.net/${config.database_name}?retryWrites=true&w=majority`;
    let db = null;

    /**
     * @description         connects to mongo atlas via url and sets db instace
     */
    async function connect() {
        try {
            const client = new MongoClient(mongoURL);
            await client.connect();

            db = client.db();

            console.log('Connected to Mongo DB');
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * @description                      performs an insert into the specified collection
     * @param {String} collectionName    name of a collection in mongo
     * @param {Object} data              data object to insert into mongo collection
     */
    async function save(collectionName, data) {
        try {
            const collection = db.collection(collectionName);
            await collection.insertOne(data);
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * @description                      performs a query on a mongo collection by deckId
     * @param {String} collectionName    name of a collection in mongo
     * @param {Object} searchTermIn      searchTerm to query
     * @return {Object or Array}         the anime object by searchTerm or all results
     */
    async function find(collectionName, searchTermIn) {
        try {
            const collection = db.collection(collectionName);

            if (searchTermIn) {
                return await collection.find({ searchTerm: searchTermIn }).next();
            } else {
                return await collection.find({}).toArray();
            }
        } catch (error) {
            console.log(error);
        }
    }

     /**
     * @description                      performs an update on a mongo collection by mal_id
     * @param {String} collectionName    name of a collection in mongo
     * @param {Object} idIn              mal_id to query
     * @param {Object} data              data to update into mongo collection
     */
     async function update(collectionName, idIn, data) {
        try {
            const collection = db.collection(collectionName);

            await collection.updateOne(
                { id: idIn },
                { $set: data },
            );
        } catch (error) {
            console.log(error);
        }
    }

    return {
        connect,
        save,
        find,
        update
    };
};

module.exports = mongo();