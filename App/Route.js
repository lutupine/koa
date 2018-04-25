const ROUTER = require('koa-router');
const USER = require('./Components/user');
const ACCOUNT = require('./Components/account');
const ROUTES = new ROUTER();
ROUTES.get('/', (ctx, next) => {
    return 1;
    console.log('Not Failed');
});

ROUTES.get('/user', USER.add);

module.exports = ROUTES;