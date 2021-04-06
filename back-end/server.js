  
const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/characters', {
  useNewUrlParser: true
});

const characterSchema = new mongoose.Schema({
  name: String,
  profession: String,
});

const Character = mongoose.model('Character', characterSchema);

// Create a new Character
app.post('/api/character', async (req, res) => {
  const character = new Character({
    name: req.body.name,
    profession: req.body.profession,
  });
  try {
    await character.save();
    res.send(character);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all of the characters
app.get('/api/character', async (req, res) => {
  try {
    let characters = await Character.find();
    res.send(characters);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//Delete a character
app.delete('/api/character/:id', async (req, res) => {
  try {
    await Character.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});



app.listen(3001, () => console.log('Server listening on port 3001!'));
