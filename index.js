const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const fileUpload = require('express-fileupload');
const authRouter = require('./routes/auth.routes');
const fileRouter = require('./routes/file.routes');
const app = express();
const PORT = process.env.PORT || config.get('serverPort');
const middleware = require('./middleware/cors.middleware');
const filePathMiddleware = require('./middleware/filepath.middleware');
const path = require('path');

app.use(fileUpload({}));
app.use(middleware);
app.use(filePathMiddleware(path.resolve(__dirname, 'files')));
app.use(express.json());
app.use(express.static('static'));
app.use('/api/auth', authRouter);
app.use('/api/files', fileRouter);

const start = async () => {
   try {
      mongoose.set('strictQuery', false);
      await mongoose.connect(config.get('bdUrl'));
      app.listen(PORT, () => {
         console.log('Server has been started ', PORT);
      });
   } catch (e) {
      console.log(e);
   }
};

start();
