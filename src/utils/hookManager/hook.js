class HookManager {
  constructor() {
    console.log("HookManager instance created");
    this.hooks = {};
  }

  register(hookName, callback, priority = 10) {
    if (!this.hooks[hookName]) {
      this.hooks[hookName] = [];
    }
    this.hooks[hookName].push({ callback, priority });
    this.hooks[hookName].sort((a, b) => a.priority - b.priority);
  }

  async action(hookName, ...args) {
    if (this.hooks[hookName]) {
      for (const { callback } of this.hooks[hookName]) {
        try {
          if (callback.constructor.name === "AsyncFunction") {
            console.log(args);
            await callback(...args);
          } else {
            callback(...args);
          }
        } catch (err) {
          console.error(`Error in hook "${hookName}":`, err);
        }
      }
    }
  }

  async filter(hookName, data, ...args) {
    if (this.hooks[hookName]) {
      for (const { callback } of this.hooks[hookName]) {
        try {
          if (callback.constructor.name === "AsyncFunction") {
            data = await callback(data, ...args);
          } else {
            data = callback(data, ...args);
          }
        } catch (err) {
          console.error(`Error in filter "${hookName}":`, err);
        }
      }
    }
    return data;
  }
}

export default new HookManager();
