process.chdir(__dirname);
const KOA = require('koa');
const BODY_PARSER = require('koa-bodyparser');
const ROUTER = require('./App/Route');
const JSON_ERROR = require('koa-json-error');
const LOGGER = require('./App/Helpers/Logger');
require('dotenv').config();
const APP = new KOA();

function formatError(Err) {
    return {
        Success: false,
        Message: Err.message
    }
}
const PORT = process.env.PORT_NUMBER || 1337;
APP
  .use(LOGGER)
  .use(JSON_ERROR(formatError))
  .use(BODY_PARSER())
  .use(ROUTER.routes())
  .use(ROUTER.allowedMethods());
const SERVER = APP.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});
module.exports = SERVER;