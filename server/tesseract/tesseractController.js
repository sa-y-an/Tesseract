'use strict';
const tesseractService = require('./tesseractService');

module.exports = {
  extract: async (req, res) => {
    const imageurl = req.query.url;
    const studentId = req.query.sid;
    if (!imageurl) {
      return res.status(400).json({
        err: 'params url is required',
      });
    }
    tesseractService.extract(imageurl, studentId);
    return res.json({ status: 'ok' });
  },
};
