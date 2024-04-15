export default class UserAccount {
  /** @type {string | undefined} */
  id;

  /** @type {string | undefined} */
  name;

  /** @type {string | undefined} */
  email;

  /** @type {string | undefined} */
  password;

  /**
   * @param {string | object} name
   * @param {string} email
   * @param {string} password
   */
  constructor(name, email, password) {
    if (typeof name === "object") {
      this.name = name.name;
      this.email = name.email;
      this.password = name.password;
      return;
    }
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
