module.exports = {
  body: null,

  send(data) {
    if (this.body === null) {
      this.body = data;
    }
  },

  setHeader(name, value) {
    this.response.setHeader(name.toLowerCase(), value);
    return this;
  },

  removeHeader(name) {
    this.response.removeHeader(name.toLowerCase());
    return this;
  },

  setStatus(code) {
    this.response.status = code;
    return this;
  },

  throw(err) {
    this.thrownError = err;
    throw err;
  },

  get requestHeaders() {
    return this.request.headers;
  },

  get status() {
    return this.response.status;
  },

  get method() {
    return this.request.method;
  },

  get path() {
    return this.request.url;
  },

  get headers() {
    return this.response._headers;
  }
};