/*
Controller for our API endpoints regarding drivers.
*/

const Driver = require("../models/Driver");
const Package = require("../models/Package");
const firebaseController = require("./firebaseCont");

const {_, generateDriverID} = require("../utils/idGeneration");

module.exports = {
    // Adds a driver to the database.
    addDriver: async (req, res) => {
        // Extracting the variables from the body
        const name = req.body.driver_name;
        const department = req.body.driver_department.toLowerCase();
        const licence = req.body.driver_licence;
        const active = Boolean(req.body.driver_isActive);

        // Now creating a new Model
        let newDriver = new Driver({
            driver_id: generateDriverID(),
            driver_name: name,
            driver_department: department,
            driver_licence: licence,
            driver_createdAt: new Date().toLocaleString(),
            driver_isActive: active
        });
        // Saving the driver
        try {
            await newDriver.save();
            // Incrementing our stats
            await firebaseController.incrementInsert();

            // Sending json
            res.status(200).json({"id": newDriver._id, "driver_id": newDriver.driver_id});
        } catch (error) {
            if (error.name === "ValidationError") {
                res.status(404).json(error["errors"]);
            } else {
                res.status(500).json(error["errors"])
            }
        }

    },
    // Gets all drivers and lists details for each package too
    listDrivers: async (req, res) => {
        // Getting the drivers.
        // Populating assigned packages
        let allDrivers = await Driver.find({}).populate('assigned_packages').exec();

        // Incrementing gets
        await firebaseController.incrementGet();
        // And sending json
        res.status(200).json(allDrivers)
    },
    deleteDriver: async (req, res) => {
        console.log("HERE")
        // Getting ID from request body
        const driverID = req.query.id;

        // Finding driver and deleting it.
        try {
            const driver = await Driver.findOneAndDelete({ _id: driverID });
            // Deleting packages if need be
            if (driver.assigned_packages.length > 0) {
                // Now deleting each package that the driver was assigned to
                for (let i = 0; i < driver.assigned_packages.length; i++) {
                    await Package.findOneAndDelete({ _id: driver.assigned_packages[i].toString() })
                };
            };
            // Incrementing deletes
            await firebaseController.incrementDelete();
            // Returning JSON object
            res.status(200).json({"acknowledged": true, "deletedCount": 1});
        } catch (error) {
            if (error.name === "ValidationError") {
                res.status(404).json(error["errors"]);
            } else {
                res.status(500).json(error)
            }
        }
    },
    updateDriver: async (req, res) => {
        // Getting relevant info from request body
        const id = req.body.id;
        const newLicence = req.body.driver_licence;
        const newDep = req.body.driver_department;

        // Updating
        try {
            await Driver.findOneAndUpdate(
                {"_id": id},
                 {driver_licence: newLicence,
                    driver_department: newDep});
            // Incrementing our updates
            await firebaseController.incrementUpdate();
            res.status(200).json({"status": "Driver updated successfully."})
        } catch (error) {
            if (error.name === "CastError") {
                res.status(404).json({"status": "ID not found."})
            } else {
                res.status(500).json({"status": "Something terrible happened."})
            }
        }
    },
    // This gets a single driver
    getDriver: async (req, res) => {
        // Getting driver id from body
        const driver_id = req.query.driver_id;

        try {
            let driver = await Driver.findOne({"driver_id": driver_id});
            await firebaseController.incrementGet();
            res.status(200).json(driver)
        } catch (error) {
            if (error.name === "CastError") {
                res.status(404).json({"status": "ID not found."})
            } else {
                res.status(500).json({"status": "Something terrible happened."})
            }
        }
    }
};