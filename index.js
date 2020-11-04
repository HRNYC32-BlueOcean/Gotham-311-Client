require('dotenv').config();
const EXPRESS = require('express');
const PATH = require('path');
const ROUTER = EXPRESS.Router();
const PORT = process.env.PORT || 3002;
const bodyParser = require('body-parser');
const {cloudinary} = require('./Uploader/something.js');
const axios = require('axios');

const APP = EXPRESS();

APP.use(EXPRESS.static(PATH.join(__dirname, 'dist')));
const distPath = PATH.join(__dirname, 'dist');
APP.use(bodyParser.json({limit:'50mb'}));
APP.use(bodyParser.urlencoded({ extended: true }));

ROUTER.get('/', (req, res) => {
  res.status(200).send('index');
});

APP.post('/postImage', async (req, res) => {
  try {
    const uploaded = req.body.image;
    const uploadedResponse = await cloudinary.uploader.upload(
      uploaded,
      function (error, result) {
        //do nothing
      }
    );
    res.send(uploadedResponse.url)
  } catch (error) {
    res.sendStatus(404);
  }
});

APP.get('/login', (req, res) => {
  res.sendFile(distPath + '/login.html');
});

APP.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
