const EnvConfig = require('../../config/env.config')
const Helper = require('../helpers/helper')

module.exports = (req, res, next) => {
    if (req.headers['x-api-key'] != EnvConfig.APIKey) {
        return Helper.response(res, false, 'Unauthorized access', null)
    }
    next()
}
