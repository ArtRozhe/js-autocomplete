import BaseDataProvider from '../Base';

/**
 * Data provider that receives the data set from the server
 */
export default class ApiDataProvider extends BaseDataProvider {
    /**
     * Creating the data provider that receives the data set from the server
     * @param {Object} options - data provider options
     * @param {boolean} options.useCache - use or not use the cache
     */
    constructor(options) {
        super(options);
    }

    /**
     * Getting the data set based on search text
     * @param {string} search - search text
     * @returns {Promise} - a promise that will end successfully with a data set, or fail with an error
     */
    getDataSet(search) {
        const dataProviderContext = this;

        return new Promise((resolve, reject) => {
            let result = null;
            console.log('--- data provider ---', dataProviderContext);
            console.log('--- search ---', search);

            result = ['example suggesting'];

            if (result) {
                resolve(result);
            } else {
                reject(new Error('error while retrieving data from the server'));
            }
        });
    }
}