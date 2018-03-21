import AbstractDataProvider from './Abstract';

/**
 * Class that implements a common functionality for all providers
 */
export default class BaseDataProvider extends AbstractDataProvider {
    constructor(options) {
        super();

        /* last received data set */
        this.cache = null;
        this.useCache = true;

        /* last search text */
        this.search = null;

        if (typeof options.useCache !== 'undefined') {
            this.useCache = options.useCache;
        }
    }

    /**
     * Saving data set to the cache
     * @param {Array} data - data set to save
     * @returns {undefined}
     * @private
     */
    _setCache(data) {
        this.cache = data;
    }

    /**
     * Getting the data set from the cache
     * @returns {Array} - data set
     * @private
     */
    _getCache() {
        return this.cache;
    }
}