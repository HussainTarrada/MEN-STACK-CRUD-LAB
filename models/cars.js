const mongoose = require('mongoose')

const carsSchema = new mongoose.Schema({
    brand: String,
    name: String,
    model: Number
})

const Cars = mongoose.model('Cars', carsSchema)

module.exports = Cars