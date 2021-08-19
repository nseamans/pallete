const _ = require('lodash');

/** testSchemeName
 *  Tests the Scheme Names credentials
 * @param {*} name 
 * @returns 
 */
export function testSchemeName(name) {
    if (name.length < 155 && name.length > 2) {
        return true;
    } else return false;
};


/** testDescription
 *  Tests the length of the description
 * @param {*} Description 
 */
export function testDescription(description) {
    if (description.length < 1024 && description.length > 8) {
        return true;
    } else return false;
};

/** testColor
 *  Tests to see if a color matches the accepted CSS 
 *  hex patterns.
 * @param {string} color The hex pattern color
 * @param {boolean} required If the color is required
 */
export function testColor(color, required) {
    const hexPattern = new RegExp('#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})');

    function hexlength(color) {
        if (color.length === 7 || color.length == 4) {
            return true;
        } else return false;
    }

    if (!_.isEqual(color.charAt(0), "#")) {
        return false;
    }

    if (required === true) {
        if (_.isString(color) &&
            hexlength(color) === true) {

            if (hexPattern.test(color) === true) {
                return true;
            } else return false;

        } else return false;
    } else {
        if (_.isUndefined(color) || color === ``) {
            return true;
        } else {
            if (hexPattern.test(color) === true &&
                hexlength(color) === true) {
                return true;
            } else return false;
        };

    };
};

/** testCategory
 *  Tests if the the categories are exact.
 * @param {*} category 
 * @returns 
 */
export function testCategory(category) {
    if (category === `UI`) {
        return true;
    } else if (category === `PRINT`) {
        return true;
    } else if (category === `ART`) {
        return true;
    } else {
        return false;
    }
};

/** testBaseColor 
 *  Tests if the base color is exact.
 * @param {*} basecolor 
 * @returns boolean
 */
export function testBaseColor(basecolor) {
    if (basecolor === `PURPLE`) {
        return true;
    } else if (basecolor === `BLUE`) {
        return true;
    } else if (basecolor === `GREEN`) {
        return true;
    } else if (basecolor === `YELLOW`) {
        return true;
    } else if (basecolor === `YELLOW`) {
        return true;
    } else if (basecolor === `RED`) {
        return true;
    } else {
        return false;
    }
};

/**
 * 
 * @param {*} info 
 * @returns boolean
 */
export function testUI(info) {
    if (info === `DARK`) {
        return true;
    } else if (info === `LIGHT`) {
        return true;
    } else if (info === `OTHER`) {
        return true;
    } else {
        return false;
    }
};

/**
 * 
 * @param {*} info 
 * @returns boolean
 */
export function testPrint(info) {
    if (info === `MAGAZINE`) {
        return true;
    } else if (info === `BROCHURE`) {
        return true;
    } else if (info === `ADVERTISEMENT`) {
        return true;
    } else if (info === `OTHER`) {
        return true;
    } else {
        return false;
    }
};

/**
 * 
 * @param {*} info 
 * @returns boolean
 */
export function testArt(info) {
    if (info === `GRADIENT`) {
        return true;
    } else if (info === `ENVIROMENT`) {
        return true;
    } else if (info === `OBJECT`) {
        return true;
    } else if (info === `SKINTONE`) {
        return true;
    } else if (info === `OTHER`) {
        return true;
    } else {
        return false;
    }
};