const Joi = require('joi');

module.exports = data => {
    const schema = Joi.object({
        source_code: Joi.string().min(3).required(),
        stdin: Joi.string().empty(''),
    });
    const validate = schema.validate(data);
    const error = {};
    if (validate.error) {
        error.stderr = validate.error.details[0].message;
        error.status = {
            description: "Validation Error"
        };
        error.stdout = "";
        return error;
    }
}