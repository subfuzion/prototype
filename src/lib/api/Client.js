import ClientAdapter from "./interfaces/ClientAdapter.js";

export default class Client extends ClientAdapter {
  /** @type {ClientAdapter} */
  #adapter;

  /**
   * @param {ClientAdapter} #adapter
   */
  constructor(adapter) {
    super();
    if (!adapter && !(adapter instanceof ClientAdapter)) {
      throw new Error("Adapter must be an instance of ClientAdapter");
    }
    this.#adapter = adapter;
  }

  /**
   * @param {UserAccount} user
   * @return {Promise<UserAccount>}
   */
  async addUser(user) {
    return this.#adapter.addUser(user);
  }

  /**
   * @param {UserAccount} user
   * @return {Promise<boolean>}
   */
  async deleteUser(user) {
    return this.#adapter.deleteUser(user);
  }

  /**
   * @return {Promise<boolean>}
   */
  async deleteAllUsers() {
    return this.#adapter.deleteAllUsers();
  }

  /**
   * @param {string} id
   * @return {Promise<UserAccount | undefined>}
   */
  async getUser(id) {
    return this.#adapter.getUser(id);
  }

  /**
   * @param {string} name
   * @return {Promise<UserAccount | undefined>}
   */
  async getUserByName(name) {
    return this.#adapter.getUserByName(name);
  }

  /**
   * @param {string} email
   * @return {Promise<UserAccount | undefined>}
   */
  async getUserByEmail(email) {
    return this.#adapter.getUserByEmail(email);
  }
}
