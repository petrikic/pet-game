const {
    python
} = require('compile-run');

module.exports = async (body, res) => {
    let response = {};
    try {
        const result = await python.runSource(body.source_code, body.stdin);
        response.stderr = null;
        response.memory = result.memoryUsage;
        response.compile_output = null;
        response.status = {};
        if (result.stderr != "" || result.exitcode === 1) {
            response.stderr = result.stderr;
            response.status.description = "Compilation Error";
        } else {
            response.status.description = "Accepted";
        }
        response.stdout = result.stdout;
    } catch (err) {
        console.log("this is error");
        console.log(err);
        response.stderr = err.stderr;
        response.stdout = result.stdout;
        response.memory = result.memoryUsage;
        response.compile_output = null;
    };
    
    return response;
}