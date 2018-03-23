import BaseDataProvider from '../Base';

/**
 * Local data Provider
 */
export default class LocalDataProvider extends BaseDataProvider {
    /**
     * Creating the local data provider
     * @param {Object} options - data provider options
     * @param {Array} options.data - local data for filtering
     * @param {function} options.selectStrategyCb - search strategy in an array of data for a given phrase
     * @param {boolean} options.useCache - use or not use the cache
     */
    constructor(options) {
        super(options);

        this.data = options.data;
        this.selectStrategyCb = options.selectStrategyCb || this.constructor._dSelectStrategyCb;
    }

    /**
     * Default search strategy in an array of data for a given phrase
     * @param {string} search - search string
     * @param {string} item - local data array element
     * @param {number} index - index of an element in an array of data
     * @param {Object} data - data array
     * @returns {boolean} - should or should not be included in the final date set
     * @private
     */
    static _dSelectStrategyCb(search, item) {
        return item.indexOf(search) !== -1;
    }

    /**
     * Filtering an array of data based on a search text
     * @param {string} search - search text
     * @returns {Array} - data set
     * @private
     */
    _getSelection(search) {
        const data = this.data;

        /* simple logic: just look for occurrences of a substring in a string */
        return data.filter(this.selectStrategyCb.bind(null, search));
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