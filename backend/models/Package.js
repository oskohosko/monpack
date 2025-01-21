/*
File containing the model for our Patient for Mongoose.
*/
const mongoose = require("mongoose");

// And here is our schema
const packageSchema = mongoose.Schema({
    package_id: {
        type: String
    },
    package_title: {
        type: String,
        required: true,
        validate: {
            validator: (title) => {
                return checkTitle(title);
            },
            message: "Title must be alphanumeric with length between 3 and 15 inclusive"
        }
    },
    package_weight: {
        type: Number,
        requied: true,
        validate: {
            validator: (weight) => {
                return weight > 0;
            },
            message: "Weight must be a positive non-zero number"
        }
    },
    package_destination: {
        type: String,
        required: true,
        validate: {
            validator: (dest) => {
                return checkDest(dest);
            },
            message: "Destination must be alphanumeric of length between 5 and 15 inclusive."
        }
    },
    description: {
        type: String,
        validate: {
            validator: (desc) => {
                return desc.length >= 0 && desc.length <= 30;
            },
            message: "Description must be between 0 and 30 characters inclusive."
        }
    },
    createdAt: {
        type: String
    },
    isAllocated: {
        type: Boolean,
        required: true,
        validate: {
            validator: (alloc) => {
                return typeof alloc == "boolean";
            },
            message: "Ensure yes or no."
        }
    },
    driver_id: {
        type: mongoose.Schema.Types.ObjectId,
		ref: "Driver",
    }
});

// Helper functions for validation
/**
 * Checks if the title is valid.
 * @param {string} title - The title to check.
 * @returns {boolean} True if the title is valid, false otherwise.
 */
function checkTitle(title) {
    const titleRE = /^[A-Za-z0-9]{3,15}$/;
    return titleRE.test(title);
};

/**
 * Checks if the destination is valid.
 * @param {string} dest - The destination to check.
 * @returns {boolean} True if the destination is valid, false otherwise.
 */
function checkDest(dest) {
    const destRE = /^[A-Za-z0-9]{5,15}$/;
    return destRE.test(dest);
};

// Now exporting
module.exports = mongoose.model("Package", packageSchema);