import {
    createDomEl,
    getParentByClassName,
    getNextSiblingByClassName,
    getPrevSiblingByClassName,
    scrollToElement,
    charCodes
} from './helpers';

/**
 * AutoComplete component
 */
export default class AutoComplete {
    /**
     * Creating autocomplete component
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
            input: 'auto-complete-input',
            suggestionActive: 'active',
            suggestionsGroupTitle: 'suggestions-group-title'
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
        const re = new RegExp(`(${searchingText.split(' ').join('|')})`, 'gi');

        resultHtml = `${resultHtml}<div>${suggestionText.replace(re, '<span style="color: #0097A7;">$1</span>')}</div>`;

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
     * Handling mouse over event on a suggestion
     * @param {Object} suggestion - suggestion
     * @param {Object} autocompleteContainer - autocomplete component DOM container
     * @returns {undefined}
     * @private
     */
    _onSuggestionMouseOver(suggestion, autocompleteContainer) {
        const active = autocompleteContainer.querySelector(`.${this.classNames.suggestionActive}`);

        if (active) {
            active.classList.remove(this.classNames.suggestionActive);
        }

        suggestion.classList.add(this.classNames.suggestionActive);
    }

    /**
     * Handling mouse out event on a suggestion
     * @param {Object} suggestion - suggestion
     * @param {Object} autocompleteContainer - autocomplete component DOM container
     * @returns {undefined}
     * @private
     */
    _onSuggestionMouseOut(suggestion) {
        suggestion.classList.remove(this.classNames.suggestionActive);
    }

    /**
     * Handling mouse down event on a suggestion
     * @param {Object} suggestion - suggestion
     * @param {Object} suggestionsContainer - DOM element contains all suggestions
     * @param {Object} autocompleteContainer - autocomplete component DOM container
     * @param {Object} containerInput - autocomplete component input
     * @returns {undefined}
     * @private
     */
    _onSuggestionMouseDown(suggestion, suggestionsContainer, autocompleteContainer, containerInput) {
        this._confirmSuggestion(suggestion, suggestionsContainer, autocompleteContainer, containerInput);
    }

    /**
     * Confirming a suggestion
     * @param {Object} suggestion - suggestion
     * @param {Object} suggestionsContainer - DOM element contains all suggestions
     * @param {Object} autocompleteContainer - autocomplete component DOM container
     * @param {Object} containerInput - autocomplete component input
     * @returns {undefined}
     * @private
     */
    _confirmSuggestion(suggestion, suggestionsContainer, autocompleteContainer, containerInput) {
        if (!suggestion) {
            return;
        }

        const newValue = suggestion.getAttribute('data-suggestion');

        containerInput.value = newValue;
        autocompleteContainer.lastInputValue = newValue;
        this._closeSuggestionsContainer(suggestionsContainer);
    }

    _selectSuggestion(suggestionsContainer, suggestion, containerInput) {
        suggestionsContainer.classList.add(this.classNames.suggestionsContainerShow);
        suggestion.classList.add(`${this.classNames.suggestionActive}`);
        if (suggestionsContainer.querySelector(`.${this.classNames.suggestion}`) === suggestion) {
            suggestionsContainer.scrollTop = 0;
        } else {
            scrollToElement(suggestionsContainer, suggestion);
        }
        containerInput.value = suggestion.getAttribute('data-suggestion');
    }

    /**
     * Creating a single suggestion container
     * @param {string} suggestion - suggestion text
     * @param {string} search - searching text
     * @returns {string} - html result
     * @private
     */
    _createSingleSuggestion(suggestion, search) {
        return `<div class="auto-complete-suggestion" data-suggestion="${suggestion}">${this.options.generateLayoutSuggestion(suggestion, search)}</div>`;
    }

    /**
     * Creating a suggestions group with a title
     * @param {Object} group - suggestions group
     * @param {string} search - searching text
     * @returns {string} - html result
     * @private
     */
    _createGroupSuggestions(group, search) {
        let groupHtml = '';
        const
            groupTitle = group.title,
            groupData = group.data,
            componentContext = this;

        groupHtml = `<h4 class="${componentContext.classNames.suggestionsGroupTitle}">${groupTitle}</h4>`;
        groupData.forEach(dataItem => {
            groupHtml = `${groupHtml}${componentContext._createSingleSuggestion(dataItem, search)}`;
        });

        return groupHtml;
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

        dataSet.forEach(dataItem => {
            if (Object.prototype.toString.call(dataItem) === '[object Object]') {
                suggestionsHtml = `${suggestionsHtml}${componentContext._createGroupSuggestions(dataItem, search)}`;
            } else {
                suggestionsHtml = `${suggestionsHtml}${componentContext._createSingleSuggestion(dataItem, search)}`;
            }
        });

        return suggestionsHtml;
    }

    /**
     * Closing suggestions container
     * @param {Object} suggestionsContainer - DOM element contains all suggestions
     * @returns {undefined}
     * @private
     */
    _closeSuggestionsContainer(suggestionsContainer) {
        suggestionsContainer.classList.remove(this.classNames.suggestionsContainerShow);
    }

    /**
     * Selecting next suggestion in the list of the suggestions
     * @param {Object} suggestionsContainer - DOM element contains all suggestions
     * @param {Object} containerInput - autocomplete component input
     * @returns {undefined}
     * @private
     */
    _selectNextSuggestion(suggestionsContainer, containerInput) {
        let active = suggestionsContainer.querySelector(`.${this.classNames.suggestionActive}`);

        if (!active) {
            active = suggestionsContainer.querySelector(`.${this.classNames.suggestion}`);
        } else {
            active.classList.remove(`${this.classNames.suggestionActive}`);
            active = getNextSiblingByClassName(active.nextSibling, this.classNames.suggestion);

            if (!active) {
                active = suggestionsContainer.querySelector(`.${this.classNames.suggestion}`);
            }
        }

        if (active) {
            this._selectSuggestion(suggestionsContainer, active, containerInput);
        }
    }

    /**
     * Selecting previous suggestion in the list of the suggestions
     * @param {Object} suggestionsContainer - DOM element contains all suggestions
     * @param {Object} containerInput - autocomplete component input
     * @returns {undefined}
     * @private
     */
    _selectPrevSuggestion(suggestionsContainer, containerInput) {
        let active = suggestionsContainer.querySelector(`.${this.classNames.suggestionActive}`);

        if (!active) {
            active = suggestionsContainer.childNodes[suggestionsContainer.childNodes.length - 1];
        } else {
            active.classList.remove(`${this.classNames.suggestionActive}`);
            active = getPrevSiblingByClassName(active.previousSibling, this.classNames.suggestion);

            if (!active) {
                active = suggestionsContainer.childNodes[suggestionsContainer.childNodes.length - 1];
            }
        }

        if (active) {
            this._selectSuggestion(suggestionsContainer, active, containerInput);
        }
    }

    /**
     * Input value change handler
     * @param {Object} autocompleteContainer - autocomplete DOM-container
     * @param {Object} containerInput - autocomplete component input
     * @returns {undefined}
     * @private
     */
    _onInputHandler(autocompleteContainer, containerInput) {
        const
            currentInputValue = containerInput.value,
            minChars = this.options.minChars,
            dataProvider = this.options.dataProvider,
            requestDelay = this.options.delay,
            componentContext = this,
            suggestionsContainer = autocompleteContainer.querySelector(`.${componentContext.classNames.suggestionsContainer}`);

        if (currentInputValue.length >= minChars) {
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
        } else {
            autocompleteContainer.lastInputValue = currentInputValue;
            suggestionsContainer.classList.remove(componentContext.classNames.suggestionsContainerShow);
        }
    }

    /**
     * Blur event handler
     * @param {Object} suggestionsContainer - DOM element contains all suggestions
     * @param {Object} event - blur event
     * @returns {undefined}
     * @private
     */
    _onBlurHandler(suggestionsContainer) {
        this._closeSuggestionsContainer(suggestionsContainer);
    }

    /**
     * Key down handler
     * @param {Object} autocompleteContainer - autocomplete DOM-container
     * @param {Object} event - input event
     * @returns {undefined}
     * @private
     */
    _onKeyDownHandler(autocompleteContainer, event) {
        const
            containerInput = event.target,
            keyCode = event.which || event.keyCode,
            suggestionsContainer = autocompleteContainer.querySelector(`.${this.classNames.suggestionsContainer}`);

        if (keyCode === charCodes.down) {
            if (containerInput.value === '') {
                return;
            }

            if (!suggestionsContainer.classList.contains(this.classNames.suggestionsContainerShow)) {
                this._onInputHandler(autocompleteContainer, containerInput);
            } else {
                this._selectNextSuggestion(suggestionsContainer, containerInput);
            }
        }

        if (keyCode === charCodes.up) {
            if (containerInput.value === '') {
                return;
            }

            if (!suggestionsContainer.classList.contains(this.classNames.suggestionsContainerShow)) {
                this._onInputHandler(autocompleteContainer, containerInput);
            } else {
                this._selectPrevSuggestion(suggestionsContainer, containerInput);
            }
        }

        if (keyCode === charCodes.esc) {
            this._closeSuggestionsContainer(suggestionsContainer);
            containerInput.value = autocompleteContainer.lastInputValue;
        }

        if (keyCode === charCodes.enter) {
            this._confirmSuggestion(
                suggestionsContainer.querySelector(`.${this.classNames.suggestionActive}`),
                suggestionsContainer,
                autocompleteContainer,
                containerInput
            );
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

        container.onKeyDownHandler = this._onKeyDownHandler.bind(this, container);
        container.onInputHandler = this._onInputHandler.bind(this, container, containerInput);
        container.onBlurHandler = this._onBlurHandler.bind(this, suggestionsContainer);

        suggestionsContainer.onMouseOverHandler = (event) => {
            const suggestion = getParentByClassName(
                event.target,
                componentContext.classNames.suggestion,
                componentContext.classNames.suggestionsContainer
            );
            if (suggestion) {
                componentContext._onSuggestionMouseOver(suggestion, container);
            }
        };
        suggestionsContainer.addEventListener('mouseover', suggestionsContainer.onMouseOverHandler);

        suggestionsContainer.onMouseOutHandler = (event) => {
            const suggestion = getParentByClassName(
                event.target,
                componentContext.classNames.suggestion,
                componentContext.classNames.suggestionsContainer
            );
            if (suggestion) {
                componentContext._onSuggestionMouseOut(suggestion, container);
            }
        };
        suggestionsContainer.addEventListener('mouseout', suggestionsContainer.onMouseOutHandler);

        suggestionsContainer.onMouseDownHandler = (event) => {
            const suggestion = getParentByClassName(
                event.target,
                componentContext.classNames.suggestion,
                componentContext.classNames.suggestionsContainer
            );
            if (suggestion) {
                componentContext._onSuggestionMouseDown(suggestion, suggestionsContainer, container, containerInput);
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
            container.appendChild(createDomEl(componentContext.classNames.suggestionsContainer));
            componentContext._bindEventListeners(container);
        });
    }

    /**
     * Unbinding all event listeners
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