'use strict';

const express = require('express');
const tesseractRouter = express.Router();
const tesseractController = require('./tesseractController');

tesseractRouter.get('/extract', (req, res, next) => {
  tesseractController.extract(req, res);
});

module.exports = { tesseractRouter };
