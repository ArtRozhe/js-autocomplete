import BaseDataProvider from '../Base';

/**
 * Data provider that receives the data set from the server
 */
export default class ApiDataProvider extends BaseDataProvider {
    /**
     * Creating the data provider that receives the data set from the server
     * @param {Object} options - data provider options
     * @param {boolean} options.useCache - use or not use the cache
     * @param {string} options.apiPath - path to the api
     */
    constructor(options) {
        super(options);

        this.apiPath = options.apiPath || null;
    }

    /**
     * Getting the data set based on search text
     * @param {string} search - search text
     * @returns {Promise} - a promise that will end successfully with a data set, or fail with an error
     */
    getDataSet(search) {
        const
            useCache = this.useCache,
            apiPath = this.apiPath,
            dataProviderContext = this;

        return new Promise((resolve, reject) => {
            let result = null;

            if (useCache) {
                result = dataProviderContext._getCache(search);

                if (result) {
                    resolve(result);
                    return;
                }
            }

            fetch(`${apiPath}${search}`)
                .then(res => res.json())
                .then(dataSet => {
                    if (dataSet) {
                        resolve(dataSet);
                        if (useCache) {
                            dataProviderContext._setCache(search, dataSet);
                        }
                    } else {
                        reject(new Error('error while retrieving data from the server'));
                    }
                })
                .catch(() => {
                    reject(new Error('error while retrieving data from the server'));
                });
        });
    }
}