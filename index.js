const ctx = require('./ctx');

module.exports = class Frame {
  constructor() {
    this.middleware = [];
    this.onerror = null;
    this.handler = this.handler.bind(this);
  }

  async onError(err, ctx) {
    if (typeof this.onerror === 'function') {
      return await this.onerror(err, ctx);
    }
  }

  handler(req, res) {
    const curCtx = Object.create(ctx);
    curCtx.request = req;
    curCtx.response = res;

    runMiddleware(this.middleware, curCtx)
      .then(() => {
        completeResponse(curCtx);
      })
      .catch(err => {
        this.onError(err, curCtx)
          .then(() => completeResponse(curCtx));
      })

  }

  use(mw) {
    this.middleware.push(mw);
  }
};

function completeResponse(ctx) {
  if (ctx.body !== null) {
    let response = ctx.body;

    if (typeof ctx.body === 'object') {
      response = JSON.stringify(response);
      if (!ctx.noJsonOverride) {
        ctx.response.setHeader('Content-Type', 'application/json');
      }
    }

    ctx.response.write(response);
  }
  ctx.response.end();
}

function runMiddleware(middleware, ctx) {
  let i = 0;
  const run = async idx => {
    if (typeof middleware[idx] === 'function') {
      return await middleware[idx](ctx, () => run(idx+1));
    }
  };
  return run(i);
};
