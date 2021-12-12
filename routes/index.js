// import required modules and packages
const express = require('express');
const app = express();
const routeForNotes = require('./notes');

app.use('/notes', routeForNotes);

module.exports = app;