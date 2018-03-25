import AbstractDataProvider from './Abstract';

/**
 * Class that implements a common functionality for all providers
 */
export default class BaseDataProvider extends AbstractDataProvider {
    constructor(options) {
        super();

        /* cache object */
        this.cache = {};

        this.useCache = true;

        if (typeof options.useCache !== 'undefined') {
            this.useCache = options.useCache;
        }
    }

    /**
     * Saving data set to the cache
     * @param {string} key - key
     * @param {Array} data - data set to save
     * @returns {undefined}
     * @private
     */
    _setCache(key, data) {
        this.cache[key] = data;
    }

    /**
     * Getting the data set from the cache
     * @param {string} key - key
     * @returns {Array} - data set
     * @private
     */
    _getCache(key) {
        return this.cache[key];
    }

    /**
     * Clear cache object
     * @returns {undefined}
     * @private
     */
    _clearCache() {
        this.cache = {};
    }
}