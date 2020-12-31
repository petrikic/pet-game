const expression = /import os/i;
const message = {
    details: [{
        message: `"source_code" fails to import lib: "import os"`
    }]
}

const validateExpression = data => {
    if (expression.test(data.source_code)) {
        return {
            error: message
        };
    }
}

module.exports = validateExpression;