/**
 * Abstract class describing the interface of data providers
 */
export default class AbstractDataProvider {
    _setCache() {
        throw new Error('You have to implement the method "_setCache" before using it. Super class: ', this.constructor);
    }

    _getCache() {
        throw new Error('You have to implement the method "_getCache" before using it. Super class: ', this.constructor);
    }

    getDataSet() {
        throw new Error('You have to implement the method "getDataSet" before using it. Super class: ', this.constructor);
    }
}