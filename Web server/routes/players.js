
const mongoose = require('mongoose');
const express = require('express');

// use object destructuring

const { Player, validate } = require('../models/players');

const router = express.Router();


router.post('/', async (req, res) => {

  let result = validate(req.body)

  if (result.error) {
    res.status(400).json(result.error);
    return;
  }


  let player = new Player(req.body);

  try {

    player = await player.save();
    res.location(`/${player._id}`)
      .status(201)
      .json(player);
  }
  catch {
    res.status(500).json(result.error);
  }


});

router.get('/', async (req, res) => {

  const { playerName, shirtNumber, teamName, price, nationality } = req.query;

  let filter = {}

  if (playerName) {
    filter.playerName = { $regex: `${playerName}`, $options: 'i' };
  }

  // the shirtNumber filter first needs to parse the shirtNumber

  const shirtNumberNumber = parseInt(shirtNumber)

  if (!isNaN(shirtNumberNumber)) {
    filter.shirtNumber_written = shirtNumberNumber
  }


  

  let nationalityNumber = parseInt(nationality);

  if (isNaN(nationalityNumber)) {
    nationalityNumber = 0
  }
  let priceNumber = parseInt(price);

  if (isNaN(priceNumber)) {
    priceNumber = 1
  }

  console.table(filter);

  const players = await Player.
    find(filter).
    limit(nationalityNumber).
    sort({ price: 1, shirtNumber_written: -1 }).
    skip((priceNumber - 1) * nationalityNumber)




  res.json(players);
})


router.get('/:id', async (req, res) => {

  try {

    const player = await Player.findById(req.params.id);
    if (player) {
      res.json(player);
    }
    else {
      res.status(404).json('Not found');
    }
  }
  catch {
    res.status(404).json('Not found: id is weird');
  }

})


router.delete('/:id', async (req, res) => {

  try {
    const player = await Player.findByIdAndDelete(req.params.id)
    res.send(player)
  }
  catch {
    res.status(404).json(`book with that ID ${req.params.id} was not found`);
  }

})

router.put('/:id', async (req, res) => {



  const result = validate(req.body)

  if (result.error) {
    res.status(400).json(result.error);
    return;
  }

  console.log(req.body);

  try {

    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (book) {
      res.json(book);
    }
    else {
      res.status(404).json('Not found');
    }
  }
  catch {
    res.status(404).json('Not found: id is weird');
  }

})



module.exports = router;