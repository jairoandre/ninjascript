import express from 'express';
import { getRouter } from './api';
import bodyParser from 'body-parser';
import path from 'path';

initApp();

function initApp() {
  var app = express();

  let apiRouter = getRouter();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  app.use('/api', apiRouter);
  app.use('/public', express.static(path.join(__dirname, '..', '..', 'public')));

  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname,'..','..','index.html'));
  });

  app.get('/favicon.ico', function(req, res) {
    res.sendFile(path.join(__dirname,'..','..','/public/favicon.ico'));
  });

  app.listen(3000, function() {
    console.log('Running app listening on port 3000.');
  });

}
