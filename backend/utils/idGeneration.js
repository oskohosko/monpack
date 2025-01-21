/*
Contains helpful code for generating IDs for our packages and drivers
*/

/**
 * Gets a random number between min (inclusive) and max (exclusive).
 * @param {number} min - The minimum value (inclusive).
 * @param {number} max - The maximum value (exclusive).
 * @returns {number} A random number between min and max.
 */
function randNum(min, max) {
    // Should return a random number between min (inclusive) and max (exclusive)
    return Math.floor(Math.random() * (max - min) + min);
};

/**
 * Gets a string of n random uppercase letters.
 * @param {number} n - The number of random uppercase letters to generate.
 * @returns {string} A string of n random uppercase letters.
 */
function randLets(n) {
    // constants
    const UPPER_ALPH = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const ALPH_LENGTH = 26;

    // output string
    let res = "";
    // Looping 3 times
    for (let _ = 0; _ < n; _++) {
        // Getting index between 0 and 26 (exclusive)
        let index = randNum(0, ALPH_LENGTH);
        // Adding random letter to output
        res += UPPER_ALPH[index];
    };

    return res;
};


/**
 * Generates a unique package ID.
 * @returns {string} The generated package ID.
 */
function generatePackageID() {
    return `P${randLets(2)}-31-${randNum(100, 1000)}`;
};

/**
 * Generates a unique driver ID.
 * @returns {string} The generated driver ID.
 */
function generateDriverID() {
    return `D${randNum(10, 100)}-31-${randLets(3)}`;
};

// Exporting
module.exports = {generatePackageID, generateDriverID}