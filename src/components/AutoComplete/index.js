/**
 * AutoComplete component
 */
export default class AutoComplete {
    constructor(options) {
        this.options = {
            autoRun: true,
            containers: null,
            delay: 100,
            minChars: 3
        };

        this._setOptions(options);
        this._setContainers(this.options.containers);

        if (this.options.autoRun) {
            this.run();
        }
    }

    /**
     * Getting the DOM containers of a component
     * @returns {Array} DOM containers
     * @private
     */
    _getContainers() {
        return this.options.containers;
    }

    /**
     * Saving a set of containers as an array
     * @param {Object|string|Array} containers - DOM container, Array, selector or HTMLCollection
     * @returns {undefined}
     * @private
     */
    _setContainers(containers) {
        if (typeof containers === 'object') {
            this.options.containers = [containers];
        }

        if (typeof containers === 'string') {
            this.options.containers = Array.prototype.slice.call(document.querySelectorAll(containers));
        }
    }

    /**
     * Saving the options sent by the user
     * @param {Object} newOptions - custom component options
     * @returns {Object} currentOptions - updated component options
     * @private
     */
    _setOptions(newOptions) {
        let newOptionsPropName = null;
        const currentOptions = this.options;

        for (newOptionsPropName in newOptions) {
            if (Object.prototype.hasOwnProperty.call(currentOptions, newOptionsPropName)) {
                currentOptions[newOptionsPropName] = newOptions[newOptionsPropName];
            }
        }

        return currentOptions;
    }

    /**
     * Binding event listeners to each DOM container
     * @returns {undefined}
     * @private
     */
    _bindEventListeners() {
        const containers = this._getContainers();

        containers.forEach((container) => {
            console.log('binding event listener on: ', container);
        });
    }

    /**
     * Starting the component
     * @returns {undefined}
     */
    run() {
        this._bindEventListeners();
    }

    /**
     * Deleting an instance of a component
     * @returns {undefined}
     */
    destroy() {
        console.log('destroy: ', this);
    }
}