
const Joi = require('joi');
const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    playerName: String,
    shirtNumber: Number,
    teamName: String,
    price: Number,
    nationality : String,
    
})

const Player = mongoose.model('Player', playerSchema);

function validateBook(player) {
    const schema = Joi.object({
        playerName: Joi.string().min(3),
        shirtNumber: Joi.number().integer().min(0),
        teamName: Joi.string(),
        price: Joi.number(),
        nationality: Joi.string(), 
    })
    return schema.validate(player);
}

exports.Player = Player;
exports.validate = validateBook;