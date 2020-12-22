function uuidv() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

/**
 *
 * @name i_to_coll
 * @function
 * @param {Value} value integer to coll name
 * @return {Value} coll name
 *
 */
function i_to_coll(i) {
    if (i < 26)
        return String.fromCharCode(i + 65);
    else
        return String.fromCharCode(i / 26 + 64) + String.fromCharCode(i % 26 + 65);
}

/**
 *
 * @name int
 * @function
 * @param {Value} value string to parse to integer
 * @return {Value} parsed string
 *
 */

function int(i) {
    return Number.parseInt(i, 10);
}


/**
 *
 * @name stripTrimLower
 * @function
 * @param {Value} value strip trim & lower case the string
 * @return {Value} parsed string
 *
 */
function stripTrimLower(value) {
    return value.replace(/[""'']/ig, '').trim().toLowerCase()
}

/**
 *
 * @name toBoolean
 * @function
 * @param {Value} value parse to boolean
 * @return {Boolean} parsed boolean
 *
 */
function toBoolean(value) {
    if (value === null) {
        return null
    }
    if (!value) {
        return false
    }
    if (typeof value === 'boolean') {
        return value
    }
    value = stripTrimLower(value)
    if (value === 'true' || value === '1') return true
    if (value === 'false' || value === '0') return false
    return null
}