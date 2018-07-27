module.exports = {
    'POST /testFormBody': async (ctx, next) => {
        console.log(`body: ${JSON.stringify(ctx.request.body)}`);
        console.log(`body type: ${typeof ctx.request.body}`);
        await next();
    }
}
