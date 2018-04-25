const ACCOUNT = require('./account');
var user = {
    list:async (ctx, next) => {
        ctx.body = 'Inside'
    },
    add:async(ctx, next) => {
        ctx.body = await ACCOUNT.insert();
    }

};

module.exports = user;