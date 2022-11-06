'use strict';

/**health check route */
const healthCheck = require('./server/utils/healthCheck');
const { tesseractRouter } = require('./server/tesseract/tesseractRoute');

module.exports = function (app) {
  app.use('/healthcheck', healthCheck);
  app.use('/tesseract', [], tesseractRouter);
};
