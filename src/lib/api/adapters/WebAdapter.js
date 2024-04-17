import ClientAdapter from "../interfaces/ClientAdapter.js";

export default class WebAdapter extends ClientAdapter {
    constructor() {
        super();
    }

    /**
   * @param {UserAccount} userAccount
   * @return {Promise<UserAccount>}
   */
    async addUser(userAccount) {
        return super.addUser(userAccount);
    }

    /**
   * @param {UserAccount} userAccount
   * @return {Promise<boolean>}
   */
    async deleteUser(userAccount) {
        return super.deleteUser(userAccount);
    }

    /**
   * @return {Promise<boolean>}
   */
    async deleteAllUsers() {
        return super.deleteAllUsers();
    }

    /**
   * @param {string} id
   * @return {Promise<UserAccount | undefined>}
   */
    async getUser(id) {
        return super.getUser(id);
    }

    /**
   * @param {string} name
   * @return {Promise<UserAccount | undefined>}
   */
    async getUserByName(name) {
        return super.getUserByName(name);
    }

    /**
   * @param {string} email
   * @return {Promise<UserAccount | undefined>}
   */
    async getUserByEmail(email) {
        return super.getUserByEmail(email);
    }
}
