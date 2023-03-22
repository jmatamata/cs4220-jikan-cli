const superagent = require('superagent');
const fs = require('fs/promises');
//const path = require('path');

const writeToJSON = async ( results, searchTerm ) => {
    try {
        const data = {
            resultCount : results,
            search : searchTerm
        };

        //Doesn't work, read more documentation later
        //await fs.writeFile('history.JSON',data,{flag: 'a+'});

        console.log('We are saving this to history JSON! Soon:tm: ',data);
        
    } catch (error) {
        console.log(error);
    }
};



module.exports = {
    writeToJSON
};