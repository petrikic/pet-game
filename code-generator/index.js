const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const reqValidation = require('./controller/validation');
const run_code = require('./controller/run-code');
const crc32 = require('crc-32');

const APP_PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', (req, res) => {
  return res.render('index.html');
});

app.post('/', async (req, res) => {
  const error = reqValidation(req.body);

  if (error) {
    console.log(error);
    return res.send(error);
  } else {
    const response = await run_code(req.body, res);
    console.log(response)
    return res.send(response);
  }
});

app.listen(APP_PORT, () => {
  console.log(`App running in http://localhost:${APP_PORT}`);
});