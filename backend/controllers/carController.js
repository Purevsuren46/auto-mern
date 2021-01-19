import asyncHandler from 'express-async-handler'
import Car from '../models/carModel.js'

// @desc    Fetch all Cars
// @route   GET /api/cars
// @access  Public
const getCars = asyncHandler(async (req, res) => {
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}

    const cars = await Car.find({ ...keyword })

    res.json(cars)
})

// @desc    Fetch single Car
// @route   GET /api/cars/:id
// @access  Public
const getCarById = asyncHandler(async (req, res) => {
    const car = await Car.findById(req.params.id)

    if (car) {
        res.json(car)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc    DELETE a car
// @route   DELETE /api/cars/:id
// @access  Private/Admin
const deleteCar = asyncHandler(async (req, res) => {
    const car = await Car.findById(req.params.id)

    if (car) {
        await car.remove()
        res.json({ message: 'Машин устгагдлаа' })
    } else {
        res.status(404)
        throw new Error('Car not found')
    }
})

// @desc    Create a car
// @route   POST /api/cars
// @access  Private/Admin
const createCar = asyncHandler(async (req, res) => {
    const car = new Car({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        year: 1990,
        mYear: 1990,
        grade: 'A+',
        mile: 0,
    })

    const createdCar = await car.save()
    res.status(201).json(createdCar)
})

// @desc    Update a car
// @route   PUT /api/cars/:id
// @access  Private/Admin
const updateCar = asyncHandler(async (req, res) => {
    const {name, price, image, brand, year, mYear, grade, mile} = req.body

    const car = await Car.findById(req.params.id)

    if(car) {
        car.name = name
        car.price = price
        car.image = image
        car.brand = brand
        car.year = year
        car.mYear = mYear
        car.grade = grade
        car.mile = mile


        const updatedCar = await car.save()
        res.json(updatedCar)
    } else {
        res.status(404)
        throw new Error('Car not found')
    }

    
})

export {
    getCars, getCarById, deleteCar, createCar, updateCar
}