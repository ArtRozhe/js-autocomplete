/**
 * Create DOM element by class name
 * @param {string} className - class name
 * @returns {Object} element - DOM element
 * @private
 */
function createDomEl(className) {
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
function getParentByClassName(element, className, stopClassName) {
    if (!element || element.classList.contains(stopClassName)) {
        return null;
    }

    if (element.classList.contains(className)) {
        return element;
    }

    return getParentByClassName(element.parentNode, className, stopClassName);
}

/**
 * Getting next sibling in the container by className
 * @param {Object} element - DOM element
 * @param {string} className - className that the sibling must have
 * @returns {Object} next - DOM element with needed className
 */
function getNextSiblingByClassName(element, className) {
    if (!element) {
        return null;
    }

    if (element.classList && element.classList.contains(className)) {
        return element;
    }

    return getNextSiblingByClassName(element.nextSibling, className);
}

/**
 * Getting previous sibling in the container by className
 * @param {Object} element - DOM element
 * @param {string} className - className that the sibling must have
 * @returns {Object} next - DOM element with needed className
 */
function getPrevSiblingByClassName(element, className) {
    if (!element) {
        return null;
    }

    if (element.classList && element.classList.contains(className)) {
        return element;
    }

    return getPrevSiblingByClassName(element.previousSibling, className);
}

/**
 * Scroll to the active element
 * @param {Object} container - a container that contains an active element
 * @param {Object} element - an active element
 * @returns {undefined}
 */
function scrollToElement(container, element) {
    const
        containerMaxHeight = parseInt(getComputedStyle(container).maxHeight, 10),
        elementHeight = element.offsetHeight,
        containerScrollTop = container.scrollTop,
        elementPosTop = element.getBoundingClientRect().top - container.getBoundingClientRect().top;

    if (elementPosTop + elementHeight - containerMaxHeight > 0) {
        container.scrollTop = elementPosTop + elementHeight + containerScrollTop - containerMaxHeight;
    } else if (elementPosTop < 0) {
        container.scrollTop = elementPosTop + containerScrollTop;
    }
}

const charCodes = {
    'up': 38,
    'down': 40,
    'esc': 27,
    'enter': 13
};

export {
    createDomEl,
    getParentByClassName,
    getNextSiblingByClassName,
    getPrevSiblingByClassName,
    charCodes,
    scrollToElement
};