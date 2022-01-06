const express = require('express');
const carsBLL = require('../BLL/carsBLL');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const cars = await carsBLL.getAllCars();
        res.send(cars);
    } catch (error) {
        res.send(error);
    }
})

// Get By Id
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const car = await carsBLL.getCarById(id);
        res.send(car)
    } catch (error) {
        res.send(error);
    }
})

router.post('/', async (req, res) => {
    try {
        // option 1 - destructuring
        // let { name, model, color, hp } = req.body;
        // name = "mazda"
        // const car = {
        //     name,
        //     model,
        //     color,
        //     hp
        // }
        // option 2
        const car = req.body;
        const result = await carsBLL.addCar(car);
        res.send(result)
    } catch (error) {
        res.send(error);
    }
})

// update car
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const car = req.body;
        const result = await carsBLL.updateCar(id, car);
        res.send(result);
    } catch (error) {
        res.send(error);
    }
})

// delete car
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await carsBLL.deleteCar(id);
        res.send(result);
    } catch (error) {
        res.send(error);
    }
})

module.exports = router;