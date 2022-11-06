'use strict';

const { createWorker } = require('tesseract.js');
const worker = createWorker();
const FormData = require('form-data');
const http = require('http');
const form = new FormData();
const fs = require('fs');
const fetch = require('node-fetch');

async function uploadFile(path) {
  const url_to_send_request = MEDIA_HANDLER + '/fileUpload/cloud/text/';
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
    return mUrl;
  } else {
    console.log('error', data);
  }
}

async function updateStudentThesis(studentId, imageUrl, textUrl) {
  const fetchUrl = GATEWAY + '/student/public/createThesisExternal/';
  const body = {
    sid: studentId,
    tUrl: textUrl, // textUrl
    mUrl: imageUrl, // mediaUrl
  };
  const resp = await fetch(fetchUrl, {
    method: 'post',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await resp.json();
  console.log(data);
}

module.exports = {
  extract: async (imageUrl, studentId) => {
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const {
      data: { text },
    } = await worker.recognize(imageUrl);
    fs.writeFileSync('uploadFile/template.txt', text);
    const textUrl = await uploadFile('uploadFile/template.txt');
    updateStudentThesis(studentId, imageUrl, textUrl);
    await worker.terminate();
  },
};
