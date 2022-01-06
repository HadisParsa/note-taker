// import packages
const express = require('express');

const path = require('path');

const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001;

const app = express();

// Sets up the Express app to handle data parsing

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//route to get API
app.use('/api', api);

// allowing full access to folder public
app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);

//GET route for notes
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//GET wildcard back to the homepage 
app.get('*', (req, res) => res.redirect('/'));

//listen for GET request
app.listen(PORT, () =>
  console.log(`Note taker application listening at http://localhost:${PORT}📝`)
);