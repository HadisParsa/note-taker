const notes = require('express').Router();
const noteFile = require('../db/db.json')
const fs = require('fs')
const { uuid } = require('uuidv4');
const path = "../db/db.json"
const util = require('util')
const readFromFile = util.promisify(fs.readFile);

notes.get('/', (req, res) => {
  readFromFile(require('path').resolve(__dirname, '../db/db.json')).then((data) => res.json(JSON.parse(data)))
})

notes.post('/', (req, res) => {
  console.log(req.body);

  fs.readFile(require('path').resolve(__dirname, '../db/db.json'), 'utf8', (err, data) => {

    if (err) {
      console.log(err)
    } else {
      const { title, text } = req.body;

      if (title && text) {
        const newNote = {
          title,
          text,
          id: `:${uuid()}`
        }
        console.log(data)
        const parsedData = JSON.parse(data);
        console.log(parsedData);
        parsedData.push(newNote)
        fs.writeFile(require('path').resolve(__dirname, '../db/db.json'), JSON.stringify(parsedData, null, 4), (err) => err ? console.log(err) : console.log(parsedData)
        );
      }
    }
  })
  res.json(`New note successfully added!`)
})


module.exports = notes;