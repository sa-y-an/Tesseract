'use strict';

const { createWorker } = require('tesseract.js');
const worker = createWorker();
const FormData = require('form-data');
const http = require('http');
const form = new FormData();
const fs = require('fs');
const fetch = require('node-fetch');

async function uploadFile(path) {
  const url_to_send_request = MEDIA_HANDLER;
  form.append('file1', 'fileData');
  form.append('my_buffer', new Buffer.alloc(10)); //appending buffer in key my_buffer
  form.append('file', fs.createReadStream(path)); //appending image in key 'my logo'
  const uploadResponse = await fetch(url_to_send_request, {
    method: 'POST',
    body: form,
  });
  const data = await uploadResponse.json();
  if (data.code === 200) {
    const mUrl = data.media.url;
    console.log(mUrl);
  } else {
    console.log('error', data);
  }
}

module.exports = {
  extract: async (imageUrl) => {
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const {
      data: { text },
    } = await worker.recognize(imageUrl);
    fs.writeFileSync('uploadFile/template.txt', text);
    await uploadFile('uploadFile/template.txt');
    await worker.terminate();
  },
};
