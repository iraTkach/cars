const Car = require('../models/carModel');

// Get-All
const getAllCars = () => {
    return new Promise((resolve, reject) => {
        Car.find({}, (err, cars) => {
            if (err) {
                reject(err)
            } else {
                resolve(cars)
            }
        })
    })
}

// Get By Id.
const getCarById = (id) => {
    return new Promise((resolve, reject) => {
        Car.findById(id, (err, car) => {
            if (err) {
                reject(err)
            } else {
                resolve(car)
            }
        })
    })
}

// Create new Car
const addCar = (newCar) => {
    return new Promise((resolve, reject) => {
        const car = new Car(newCar);

        car.save((err) => {
            if (err) {
                reject(err)
            } else {
                resolve("Added successfully");
            }
        })
    })
}

// Update an existing car
const updateCar = (id, carToUpdate) => {
    return new Promise((resolve, reject) => {
        Car.findByIdAndUpdate(id, carToUpdate, (err) => {
            if (err) {
                reject(err)
            } else {
                resolve("Updated successfully");
            }
        })
    })
}

// Delete an existing car
const deleteCar = (id) => {
    return new Promise((resolve, reject) => {
        Car.findByIdAndDelete(id, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve("Deleted successfully");
            }
        })
    })
}

module.exports = {
    getAllCars,
    getCarById,
    addCar,
    updateCar,
    deleteCar
}