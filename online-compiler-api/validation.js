const Joi = require('joi');
const validate = require('./validate-expression');

module.exports = data  =>{
    const schema = Joi.object({
        language_id: Joi.number().integer().required(),
            source_code: Joi.string().min(3).required(),
            stdin: Joi.string().empty(''),
            expected_output: Joi.string().empty(''),
            cpu_time_limit: Joi.number(),
            
    });

    const validation = validate(data);
    if (validation) {
        return validation;
    }
    return schema.validate(data);
}

// data = {
//     "language_id": language.id,
//     "source_code": code,
//     "stdin": input,
//     "expected_output": expected_output,
//     "cpu_time_limit": timeout
// }