let instance;

export class Logger {
  constructor() {
    if (!instance) {
      instance = this;
    }
    instance.msg = "";
    return instance;
  }

  log(msg) {
    this.msg = msg;
  }

  show() {
    return this.msg;
  }
}
