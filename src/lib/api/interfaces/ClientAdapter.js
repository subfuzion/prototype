/** @type {Error} */
const NotImplementedError = new Error("Not implemented");

export default class ClientAdapter {
    /**
   * @param {UserAccount} userAccount
   * @return {Promise<UserAccount>}
   */
    async addUser(userAccount) {
        throw NotImplementedError;
    }

    /**
   * @param {UserAccount} userAccount
   * @return {Promise<boolean>}
   */
    async deleteUser(userAccount) {
        throw NotImplementedError;
    }

    /**
   * @return {Promise<boolean>}
   */
    async deleteAllUsers() {
        throw NotImplementedError;
    }

    /**
   * @param {string} id
   * @return {Promise<UserAccount | undefined>}
   */
    async getUser(id) {
        throw NotImplementedError;
    }

    /**
   * @param {string} name
   * @return {Promise<UserAccount | undefined>}
   */
    async getUserByName(name) {
        throw NotImplementedError;
    }

    /**
   * @param {string} email
   * @return {Promise<UserAccount | undefined>}
   */
    async getUserByEmail(email) {
        throw NotImplementedError;
    }
}
