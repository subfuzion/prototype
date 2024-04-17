import ClientAdapter from "../interfaces/ClientAdapter.js";

class MockDatabase {
    /** @type {UserAccount[]} */
    userAccounts = [];
}

export default class MockAdapter extends ClientAdapter {
    /** @type {MockDatabase} */
    static database = new MockDatabase();

    /** @type {UserAccount[]} */
    userAccounts;

    constructor() {
        super();
        this.userAccounts = MockAdapter.database.userAccounts;
    }

    /**
   * @param {UserAccount} userAccount
   * @return {Promise<UserAccount>}
   */
    async addUser(userAccount) {
        return new Promise((resolve) => {
            userAccount.id = userAccount.name;
            this.userAccounts.push(userAccount);
            resolve(userAccount);
        });
    }

    /**
   * @param {UserAccount} userAccount
   * @return {Promise<boolean>}
   */
    async deleteUser(userAccount) {
        return new Promise((resolve) => {
            this.userAccounts
        = this.userAccounts.filter(u => u.id !== userAccount.id);
            resolve(true);
        });
    }

    /**
   * @return {Promise<boolean>}
   */
    async deleteAllUsers() {
        return new Promise((resolve) => {
            this.userAccounts = [];
            resolve(true);
        });
    }

    /**
   * @param {string} id
   * @return {Promise<UserAccount | undefined>}
   */
    async getUser(id) {
        return new Promise((resolve) => {
            const user = this.userAccounts.find(u => u.id === id);
            resolve(user);
        });
    }

    /**
   * @param {string} name
   * @return {Promise<UserAccount | undefined>}
   */
    async getUserByName(name) {
        return new Promise((resolve) => {
            const user = this.userAccounts.find(u => u.name === name);
            resolve(user);
        });
    }

    /**
   * @param {string} email
   * @return {Promise<UserAccount | undefined>}
   */
    async getUserByEmail(email) {
        return new Promise((resolve) => {
            const user = this.userAccounts.find(u => u.email === email);
            resolve(user);
        });
    }
}
