const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/notes', (req, res) => {
  fs.readFile('./db/db.json', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Error reading db.json' });
    } else {
      if (!data) {
        res.json([]); // Return an empty array if the file is empty
      } else {
        const notes = [].concat(JSON.parse(data))
        res.json(notes);
        console.log(notes)
      }
    }
  });
});


router.post('/notes', (req, res) => {
  const newNote = req.body;
  fs.readFile('./db/db.json', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Error reading db.json' });
    } else {
      const notes = JSON.parse(data);
      notes.push(newNote);
      fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
        if (err) {
          console.error(err);
          res.status(500).send({ message: 'Error writing to db.json' });
        } else {
          res.json(newNote);
        }
      });
    }
  });
});

module.exports = router