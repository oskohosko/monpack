/*
Controller to manage our API endpoints regarding packages.
*/

const Package = require("../models/Package");
const Driver = require("../models/Driver");
const firebaseController = require("./firebaseCont");

const {generatePackageID, _} = require("../utils/idGeneration");

module.exports = {
    addPackage: async (req, res) => {
        // Getting variables from the request body
        let title = req.body.package_title;
        let weight = req.body.package_weight;
        let destination = req.body.package_destination;
        let description = req.body.description;
        let allocated = req.body.isAllocated;
        let driverId = req.body.driver_id;

        // Creating a new Package model
        let newPackage = new Package({
            package_id: generatePackageID(),
            package_title: title,
            package_weight: weight,
            package_destination: destination,
            description: description,
            createdAt: new Date().toLocaleString(),
            isAllocated: allocated,
            driver_id: driverId // MongoDB ID
        });

        // And now attempting to save it
        try {
            let addedPackage = await newPackage.save();
            // And now trying to add package to driver's assigned packages
            let packDriver = await Driver.findOne({_id: driverId});
            packDriver.assigned_packages.push(addedPackage._id.toString());
            await packDriver.save();

            // Incrementing inserts
            await firebaseController.incrementInsert();

            // Sending JSON object
            res.status(200).json({
                "id": addedPackage._id.toString(),
                "package_id": addedPackage.package_id})
        } catch (error) {
            if (error.name === "ValidationError") {
                res.status(404).json(error);
            } else {
                res.status(500).json(error);
            };
        };

    },
    listPackages: async (req, res) => {
        // Getting all of the packages
        let allPackages = await Package.find({}).populate("driver_id").exec();

        // Incrementing gets
        await firebaseController.incrementGet();

        // Sending JSON Object
        res.status(200).json(allPackages);
    },
    deletePackage: async (req, res) => {
        // Deletes driver by id
        // Getting ID from request
        const packageID = req.query.id;
        // Trying to find and delete the relevant package
        try {
            // Deleting package
            let package = await Package.findOneAndDelete({_id: packageID});
            // And finding the driver with this package and removing the package from its list
            let packDriver = await Driver.findOne({ _id: package.driver_id });
            packDriver.assigned_packages.splice(packDriver.assigned_packages.indexOf(package._id), 1);
            await packDriver.save();

            // Updating deletes
            await firebaseController.incrementDelete();

            // Sending success message and returning
            res.status(200).json({
                "acknowledged": true,
                "deletedCount": 1
            });
        } catch (error) {
            if (error.name === "ValidationError") {
                res.status(404).json(error["errors"]);
            } else {
                res.status(500).json(error)
            }
        };
    },
    updatePackage: async (req, res) => {
        // Getting id and destination from request body
        let packageId = req.body.package_id;
        let newDest = req.body.package_destination;

        // Updating
        try {
            await Package.findOneAndUpdate(
                {"_id": packageId},
                 {package_destination: newDest});
            // And updating updates
            await firebaseController.incrementUpdate();
            // Sending success message
            res.status(200).json({"status": "Package updated successfully."})
        } catch (error) {
            if (error.name === "CastError") {
                res.status(404).json({"status": "ID not found."})
            } else {
                res.status(500).json({"status": "Something terrible happened."})
            }
        }
    }
};