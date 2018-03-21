import BaseDataProvider from '../Base';

/**
 * Local data Provider
 */
export default class LocalDataProvider extends BaseDataProvider {
    /**
     * Creating the local data provider
     * @param {Object} options - data provider options
     * @param {Array} options.data - local data for filtering
     * @param {boolean} options.useCache - use or not use the cache
     */
    constructor(options) {
        super(options);

        this.data = options.data;
    }

    /**
     * Filtering an array of data based on a search text
     * @param {string} search - search text
     * @returns {Array} - data set
     * @private
     */
    _getSelection(search) {
        /* the logic of the selection of the data from the existing data stored by the provider */
        console.log(`--- selection by ${search} from ${this.data} ---`);

        return this.data;
    }

    /**
     * Setting the local data
     * @param {Array} data - local data
     * @returns {undefined}
     */
    setData(data) {
        this.data = data;
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

            /* For now, we assume that the provider does not use caching */
            /* TODO: need to implement the caching mode */
            result = dataProviderContext._getSelection(search);

            if (result) {
                resolve(result);
            } else {
                reject(new Error('Error while data selection'));
            }
        });
    }
}