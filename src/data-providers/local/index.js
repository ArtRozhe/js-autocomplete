import BaseDataProvider from '../Base';

/**
 * Local data Provider
 */
export default class LocalDataProvider extends BaseDataProvider {
    /**
     * Creating the local data provider
     * @param {Object} options - data provider options
     * @param {Array} options.data - local data for filtering
     * @param {function} options.selectionCb - search strategy in an array of data for a given phrase
     * @param {boolean} options.useCache - use or not use the cache
     */
    constructor(options) {
        super(options);

        this.data = options.data || null;
        this.selectionCb = options.selectionCb || this.constructor._dSelectionCb;
    }

    /**
     * Default selection callback
     * @param {string} data - all data
     * @param {Object} search - searching phrase
     * @returns {Array} - result dataset
     * @private
     */
    static _dSelectionCb(data, search) {
        /* simple logic: just look for occurrences of a substring in a string */
        let result = [];

        if (Object.prototype.toString.call(data[0]) === '[object String]') {
            result = data.filter(item => {
                return item.toLowerCase().indexOf(search.toLowerCase()) !== -1;
            });
        } else {
            data.forEach(item => {
                let innerData = [];
                if (!item.title || !item.data) {
                    return;
                }

                innerData = item.data.filter(innerItem => {
                    return innerItem.toLowerCase().indexOf(search.toLowerCase()) !== -1;
                });

                if (innerData.length > 0) {
                    result.push({
                        title: item.title,
                        data: innerData
                    });
                }
            });
        }

        return result;
    }

    /**
     * Filtering an array of data based on a search text
     * @param {string} search - search text
     * @returns {Array} - data set
     * @private
     */
    _getSelection(search) {
        const data = this.data;

        return this.selectionCb(data, search);
    }

    /**
     * Setting the local data
     * @param {Array} data - local data
     * @returns {undefined}
     */
    setData(data) {
        this.data = data;
        this._clearCache();
    }

    /**
     * Getting the data set based on search text
     * @param {string} search - search text
     * @returns {Promise} - a promise that will end successfully with a data set, or fail with an error
     */
    getDataSet(search) {
        const
            dataProviderContext = this,
            useCache = dataProviderContext.useCache;

        return new Promise((resolve, reject) => {
            let result = null;

            if (useCache) {
                result = dataProviderContext._getCache(search);

                if (result) {
                    resolve(result);
                    return;
                }
            }

            result = dataProviderContext._getSelection(search);

            if (result) {
                resolve(result);
                if (useCache) {
                    dataProviderContext._setCache(search, result);
                }
            } else {
                reject(new Error('Error while data selection'));
            }
        });
    }
}