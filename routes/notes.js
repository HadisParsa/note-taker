const notes = require('express').Router();
const { readFromFile,
  readAndAppend,
  writeToFile } = require("../helpers/fsUtils");
const { v4: uuidv4 } = require("uuid");

//GET route to retrieve all notes 
notes.get('/', (req, res) => {
  console.info(`${req.method} request received`);
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});


// POST route to add a new note
notes.post("/", (req, res) => {
  if (req.body) {
    const newNote = {
      title: req.body.title,
      text: req.body.text,
      id: uuidv4(),
    };

    readAndAppend(newNote, "./db/db.json");
    res.json("Good job, Note successfully added.");
  } else {
    res.json("Oops, Error in order to adding note.");
  }
});

// DELETE Route
notes.delete("/:id", (req, res) => {
  const noteId = req.params.id;
  readFromFile("./db/db.json")

    //parse the data as a string 
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of notes but filter the ID provided in the URL
      const result = json.filter((note) => note.id !== noteId);

      // Save the array
      writeToFile("./db/db.json", result);

      // DELETE request 
      res.json(`${noteId} has been deleted!`);
    });
});

module.exports = notes;