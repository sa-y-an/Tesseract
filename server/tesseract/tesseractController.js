'use strict';
const tesseractService = require('./tesseractService');

module.exports = {
  extract: async (req, res) => {
    const imageurl = req.query.url;
    if (!imageurl) {
      return res.status(400).json({
        err: 'params url is required',
      });
    }
    tesseractService.extract(imageurl);
    return res.json({ status: 'ok' });
  },
};
