/*
File containing our Driver model for Mongoose.
*/

const mongoose = require("mongoose");

// Here is our Schema
const driverSchema = mongoose.Schema({
    // Id for the driver that is auto generated
    driver_id: {
        type: String,
    },
    // Name of the driver
    driver_name: {
        type: String,
        required: true,
        validate: {
            validator: (newName) => {
                return checkName(newName);
            },
            message: "Name needs to be alphabetic with length between 3 and 20 inclusive."
        }
    },
    // Department of the driver
    driver_department: {
        type: String,
        required: true,
        validate: {
            validator: (newDep) => {
                return ["food", "electronic", "furniture"].includes(newDep);
            },
            message: "Department needs to be 'food', 'electronic' or 'furniture'."
        }
    },
    // Licence of the driver
    driver_licence: {
        type: String,
        required: true,
        validate: {
            validator: (newLicence) => {
                return checkLicence(newLicence);
            },
            message: "Licence needs to be alphanumeric of length 5."
        }
    },
    // Time the driver was created
    driver_createdAt: {
        type: String
    },
    // If they are active.
    driver_isActive: {
        type: Boolean,
        required: true,
        validate: {
            validator: (isActive) => {
                return typeof isActive == "boolean";
            },
            message: "true or false."
        }
    },
    // Reference to their assigned packages
    assigned_packages: [{
        type: mongoose.Schema.Types.ObjectId,
		ref: "Package",
    }]
});

// Helper functions for validation

/**
 * Checks if the name is valid.
 * @param {string} name - The name to check.
 * @returns {boolean} True if the name is valid, false otherwise.
 */
function checkName(name) {
    const nameRE = /^[A-Za-z]{3,20}$/;
    return nameRE.test(name);
};

/**
 * Checks if the licence is valid.
 * @param {string} licence - The licence to check.
 * @returns {boolean} True if the licence is valid, false otherwise.
 */
function checkLicence(licence) {
    const licenceRE = /^[A-Za-z0-9]{5}$/;
    return licenceRE.test(licence);
};

// Now exporting
module.exports = mongoose.model("Driver", driverSchema);