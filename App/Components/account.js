var account = {
    list:async (ctx, next) => {
        ctx.body = 'Inside'
    },
    insert:async(ctx, next) => {
        return 1;
    },
    add:async(ctx, next) => {
        ctx.body = await account.insert();
    }

};

module.exports = account;