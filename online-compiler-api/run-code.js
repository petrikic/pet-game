const {
    c,
    cpp,
    node,
    python,
    java
} = require('compile-run');

const id_lang = {
    49: c,
    54: cpp,
    71: python,
    63: node,
    62: java
}

module.exports = async (body, res) => {
    
    compileOptions = {};
    if (body.stdin) {
        compileOptions.stdin = body.stdin;
    }
    if (body.cpu_time_limit) {
        if (body.cpu_time_limit = 1000) {
            compileOptions.timeout = 3000;
        } else
            compileOptions.timeout = body.cpu_time_limit;
    }

    let resultPromise = id_lang[body.language_id].runSource(body.source_code, compileOptions);
    resultPromise
        .then(result => {
            console.log(result);
            let response = {};
            response.stderr = null;

            response.memory = result.memoryUsage;
            response.compile_output = null;
            response.status = {};
            if (result.stderr != "" || result.exitcode === 1) {
                response.stderr = result.stderr;
                response.status.description = "Compilation Error";
            } else {
                if (body.expected_output) {
                    response.expected_output = body.expected_output;
                    result.stdout = result.stdout.replace(/\r/g, "").trim()
                    if (body.expected_output.trim() === result.stdout) {
                        response.status.description = "Accepted";
                    } else
                        response.status.description = "Wrong Answer";
                } else {
                    response.status.description = "Accepted";
                }

            }
            response.stdout = result.stdout;
            console.log(response);
            return res.send(response);
        })
        .catch(err => {
            console.log("this is error");
            console.log(err);
            let response = {};
            response.stderr = err.stderr;
            response.stdout = result.stdout;
            response.memory = result.memoryUsage;
            response.compile_output = null;

            return res.send(response);
        });
}