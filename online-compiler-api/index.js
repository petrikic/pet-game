const express = require('express');
const app = express();
const run_code = require('./run-code');
const path = require('path');
const bodyParser = require('body-parser');
const reqValidation = require('./validation');
const port = process.env.PORT || 3000;

// data = {
//     "language_id": language.id,
//     "source_code": code,
//     "stdin": input,
//     "expected_output": expected_output,
//     "cpu_time_limit": timeout
// }

app.use(express.json());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})); //

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});
app.post('/', async (req, res) => {
    //console.log(req.body);
    const {error} = reqValidation(req.body);

    console.log(error);
    if (error) {
        let response = {};
        response.stderr = error.details[0].message;
        response.status = {
            description: "Validation Error"
        };
        response.stdout = "";

        return res.send(response);
    } else {
        run_code(req.body, res);
    }
})
app.listen(port, () => console.log(`Node API  is running on ${port}`));