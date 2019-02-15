module.exports = {
  body: null,

  send(data) {
    if (this.body === null) {
      this.body = data;
    }
  },

  setHeader(name, value) {
    this.response.setHeader(name, value);
    return this;
  },

  setStatus(code) {
    this.response.status = code;
    return this;
  },

  get status() {
    return this.response.status;
  },

  get method() {
    return this.request.method;
  },

  get path() {
    return this.request.url;
  }
};