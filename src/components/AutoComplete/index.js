const charCodes = {
    'up': 38,
    'down': 40,
    'esc': 27,
    'enter': 13
};

/**
 * AutoComplete component
 */
export default class AutoComplete {
    /**
     * Создание экземпляра компонента
     * @param {Object} options - options of the component
     * @param {boolean} options.autoRun - auto run of the component
     * @param {Object|string|Array} options.containers - DOM containers
     * @param {number} options.delay - the number of milliseconds that the component waits to send a request to the data provider
     * @param {number} options.minChars - the minimum number of entered characters to send requests to the data provider
     * @param {function} options.generateLayoutSuggestion - the markup generation function for each suggestion
     * @param {Object} options.dataSource - the data provider to which the component sends a request to receive the data set
     */
    constructor(options) {
        this.options = {
            autoRun: true,
            containers: null,
            delay: 100,
            minChars: 3,
            generateLayoutSuggestion: this.constructor._defaultGenerateLayoutSuggestion,
            dataSourceProvider: null
        };

        this._setOptions(options);
        this._setContainers(this.options.containers);

        if (this.options.autoRun) {
            this.run();
        }
    }

    /**
     * The default markup generation function for each suggestion
     * @param {string} suggestionText - suggestion text
     * @param {string} searchingText - searching text
     * @returns {string} resultHtml - generated markup for a suggestion
     * @private
     */
    static _defaultGenerateLayoutSuggestion(suggestionText, searchingText) {
        let resultHtml = '';

        console.log('--- searchingText ---', searchingText);
        resultHtml = `${resultHtml}<div>${suggestionText}</div>`;

        return resultHtml;
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
     * Create DOM element by class name
     * @param {string} className - class name
     * @returns {Object} element - DOM element
     * @private
     */
    static _createDomEl(className) {
        const element = document.createElement('div');
        element.classList.add(className);
        return element;
    }

    /**
     * Input value change handler
     * @param {Object} autocompleteContainer - autocomplete DOM-container
     * @param {Object} event - input event
     * @returns {undefined}
     * @private
     */
    _onInputHandler(autocompleteContainer, event) {
        console.log(autocompleteContainer);
        console.log('--- context input ---', this);
        console.log('--- event input ---', event);
    }

    /**
     * Key down handler
     * @param {Object} autocompleteContainer - autocomplete DOM-container
     * @param {Object} event - input event
     * @returns {undefined}
     * @private
     */
    _onKeyDownHandler(autocompleteContainer, event) {
        console.log(autocompleteContainer);
        const keyCode = event.which || event.keyCode;

        if (keyCode === charCodes.down) {
            console.log('"DownArrow"');
        }

        if (keyCode === charCodes.up) {
            console.log('"UpArrow"');
        }

        if (keyCode === charCodes.esc) {
            console.log('"Esc"');
        }

        if (keyCode === charCodes.enter) {
            console.log('"Enter"');
        }

        console.log('--- context key down ---', this);
    }

    /**
     * Binding event listeners to the DOM container
     * @param {Object} container -
     * @returns {undefined}
     * @private
     */
    _bindEventListeners(container) {
        const containerInput = container.querySelector('.auto-complete-input');
        container.keyDownHandler = this._onKeyDownHandler.bind(this, container);
        container.onInputHandler = this._onInputHandler.bind(this, container);

        containerInput.addEventListener('keydown', container.keyDownHandler);
        containerInput.addEventListener('input', container.onInputHandler);
    }

    /**
     * Starting the component
     * @returns {undefined}
     */
    run() {
        const
            containers = this._getContainers(),
            componentContext = this;

        if (!containers) {
            return;
        }

        containers.forEach((container) => {
            container.appendChild(componentContext.constructor._createDomEl('suggestions-container'));
            componentContext._bindEventListeners(container);
        });
    }

    /**
     * Deleting an instance of a component
     * @returns {undefined}
     */
    destroy() {
        const containers = this._getContainers();

        if (!containers) {
            return;
        }

        containers.forEach(container => {
            const containerInput = container.querySelector('.auto-complete-input');

            containerInput.removeEventListener('keydown', container.keyDownHandler);
            containerInput.removeEventListener('input', container.onInputHandler);
        });
    }
}