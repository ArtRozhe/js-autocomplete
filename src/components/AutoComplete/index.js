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
     * @param {Object} options.dataProvider - the data provider to which the component sends a request to receive the data set
     */
    constructor(options) {
        this.options = {
            autoRun: true,
            containers: null,
            delay: 100,
            minChars: 3,
            generateLayoutSuggestion: this.constructor._defaultGenerateLayoutSuggestion,
            dataProvider: null
        };

        this._setOptions(options);
        this._setContainers(this.options.containers);

        this.classNames = {
            suggestionsContainer: 'suggestions-container',
            suggestion: 'auto-complete-suggestion',
            suggestionsContainerShow: 'suggestions-container_show',
            input: 'auto-complete-input'
        };

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
     * Getting parent element with needed className
     * @param {Object} element - the element from which the search begins
     * @param {string} className - className the element must have
     * @param {string} stopClassName - if an element has stopClassName, then the function returns null in any case
     * @returns {Object} - element with needed className
     * @private
     */
    static _getParentByClassName(element, className, stopClassName) {
        if (!element || element.classList.contains(stopClassName)) {
            return null;
        }

        if (element.classList.contains(className)) {
            return element;
        }

        return this._getParentByClassName(element.parentNode, className, stopClassName);
    }

    /**
     * Handling mouse over event on a suggestion
     * @param {Object} suggestion - suggestion
     * @param {Object} autocompleteContainer - autocomplete component DOM container
     * @returns {undefined}
     * @private
     */
    static _onSuggestionMouseOver(suggestion) {
        console.log('--- mouse over ---', suggestion);
    }

    /**
     * Handling mouse out event on a suggestion
     * @param {Object} suggestion - suggestion
     * @param {Object} autocompleteContainer - autocomplete component DOM container
     * @returns {undefined}
     * @private
     */
    static _onSuggestionMouseOut(suggestion) {
        console.log('--- mouse out ---', suggestion);
    }

    /**
     * Handling mouse down event on a suggestion
     * @param {Object} suggestion - suggestion
     * @param {Object} autocompleteContainer - autocomplete component DOM container
     * @returns {undefined}
     * @private
     */
    static _onSuggestionMouseDown(suggestion) {
        console.log('--- mouse down ---', suggestion);
    }

    /**
     * Creating suggestions list
     * @param {Array} dataSet - data set for rendering
     * @param {string} search - searching text
     * @returns {string} suggestionsHtml - suggestions list
     * @private
     */
    _createSuggestions(dataSet, search) {
        let suggestionsHtml = '';
        const
            componentContext = this;

        dataSet.forEach(suggestion => {
            suggestionsHtml = `${suggestionsHtml}<div class="auto-complete-suggestion">${componentContext.options.generateLayoutSuggestion(suggestion, search)}</div>`;
        });

        return suggestionsHtml;
    }

    /**
     * Input value change handler
     * @param {Object} autocompleteContainer - autocomplete DOM-container
     * @param {Object} event - input event
     * @returns {undefined}
     * @private
     */
    static _onInputHandler(autocompleteContainer, event) {
        const
            input = event.target,
            currentInputValue = input.value,
            minChars = this.options.minChars,
            dataProvider = this.options.dataProvider,
            lastInputValue = autocompleteContainer.lastInputValue,
            requestDelay = this.options.delay,
            componentContext = this,
            suggestionsContainer = autocompleteContainer.querySelector(`.${componentContext.classNames.suggestionsContainer}`);

        if (currentInputValue.length >= minChars) {
            if (currentInputValue !== lastInputValue) {
                clearTimeout(autocompleteContainer.timerId);
                autocompleteContainer.lastInputValue = currentInputValue;

                autocompleteContainer.timerId = setTimeout(() => {
                    dataProvider.getDataSet(currentInputValue)
                        .then(dataSet => {
                            if (dataSet.length > 0) {
                                suggestionsContainer.innerHTML = componentContext._createSuggestions(dataSet, currentInputValue);
                                suggestionsContainer.classList.add(componentContext.classNames.suggestionsContainerShow);
                            } else {
                                suggestionsContainer.classList.remove(componentContext.classNames.suggestionsContainerShow);
                            }
                        });
                }, requestDelay);
            }
        } else {
            autocompleteContainer.lastInputValue = currentInputValue;
            suggestionsContainer.classList.remove(componentContext.classNames.suggestionsContainerShow);
        }
    }

    /**
     * Blur event handler
     * @param {Object} autocompleteContainer - autocomplete DOM-container
     * @param {Object} event - blur event
     * @returns {undefined}
     * @private
     */
    static _onBlurHandler(autocompleteContainer, event) {
        console.log(autocompleteContainer);
        console.log('--- event blur ---', event);
    }

    /**
     * Key down handler
     * @param {Object} autocompleteContainer - autocomplete DOM-container
     * @param {Object} event - input event
     * @returns {undefined}
     * @private
     */
    static _onKeyDownHandler(autocompleteContainer, event) {
        console.log(autocompleteContainer);
        const keyCode = event.which || event.keyCode;

        if (keyCode === charCodes.down) {
            console.log('--- key down "DownArrow" ---');
        }

        if (keyCode === charCodes.up) {
            console.log('--- key down "DownUp" ---');
        }

        if (keyCode === charCodes.esc) {
            console.log('--- key down "Esc" ---');
        }

        if (keyCode === charCodes.enter) {
            console.log('--- key down "Enter" ---');
        }
    }

    /**
     * Binding event listeners to the DOM container
     * @param {Object} container -
     * @returns {undefined}
     * @private
     */
    _bindEventListeners(container) {
        const
            containerInput = container.querySelector(`.${this.classNames.input}`),
            suggestionsContainer = container.querySelector(`.${this.classNames.suggestionsContainer}`),
            componentContext = this;

        container.onKeyDownHandler = this.constructor._onKeyDownHandler.bind(this, container);
        container.onInputHandler = this.constructor._onInputHandler.bind(this, container);
        container.onBlurHandler = this.constructor._onBlurHandler.bind(this, container);

        suggestionsContainer.onMouseOverHandler = (event) => {
            const suggestion = componentContext.constructor._getParentByClassName(
                event.target,
                componentContext.classNames.suggestion,
                componentContext.classNames.suggestionsContainer
            );
            if (suggestion) {
                componentContext.constructor._onSuggestionMouseOver(suggestion, container);
            }
        };
        suggestionsContainer.addEventListener('mouseover', suggestionsContainer.onMouseOverHandler);

        suggestionsContainer.onMouseOutHandler = (event) => {
            const suggestion = componentContext.constructor._getParentByClassName(
                event.target,
                componentContext.classNames.suggestion,
                componentContext.classNames.suggestionsContainer
            );
            if (suggestion) {
                componentContext.constructor._onSuggestionMouseOut(suggestion, container);
            }
        };
        suggestionsContainer.addEventListener('mouseout', suggestionsContainer.onMouseOutHandler);

        suggestionsContainer.onMouseDownHandler = (event) => {
            const suggestion = componentContext.constructor._getParentByClassName(
                event.target,
                componentContext.classNames.suggestion,
                componentContext.classNames.suggestionsContainer
            );
            if (suggestion) {
                componentContext.constructor._onSuggestionMouseDown(suggestion, container);
            }
        };
        suggestionsContainer.addEventListener('mousedown', suggestionsContainer.onMouseDownHandler);

        containerInput.addEventListener('keydown', container.onKeyDownHandler);
        containerInput.addEventListener('input', container.onInputHandler);
        containerInput.addEventListener('blur', container.onBlurHandler);
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
            container.lastInputValue = null;
            container.timerId = null;
            container.appendChild(componentContext.constructor._createDomEl(componentContext.classNames.suggestionsContainer));
            componentContext._bindEventListeners(container);
        });
    }

    /**
     * Deleting an instance of a component
     * @returns {undefined}
     */
    destroy() {
        const
            containers = this._getContainers(),
            componentContext = this;

        if (!containers) {
            return;
        }

        containers.forEach(container => {
            const
                containerInput = container.querySelector(`.${componentContext.classNames.input}`),
                suggestionsContainer = container.querySelector(`.${componentContext.classNames.suggestionsContainer}`);

            containerInput.removeEventListener('keydown', container.onKeyDownHandler);
            containerInput.removeEventListener('input', container.onInputHandler);
            containerInput.removeEventListener('input', container.onBlurHandler);
            suggestionsContainer.removeEventListener('mouseover', suggestionsContainer.onMouseOverHandler);
            suggestionsContainer.removeEventListener('mouseout', suggestionsContainer.onMouseOutHandler);
            suggestionsContainer.removeEventListener('mousedown', suggestionsContainer.onMouseDownHandler);

            container.onKeyDownHandler = null;
            container.onInputHandler = null;
            container.onBlurHandler = null;
            suggestionsContainer.onMouseOverHandler = null;
            suggestionsContainer.onMouseOutHandler = null;
            suggestionsContainer.onMouseDownHandler = null;
        });
    }
}