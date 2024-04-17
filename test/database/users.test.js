import {afterEach, describe, expect, test} from "@jest/globals";
import * as assert from "node:assert/strict";

// import util from "node:util";

import MockAdapter from "../../src/lib/api/adapters/MockAdapter.js";
import Client from "../../src/lib/api/Client.js";
import UserAccount from "../../src/lib/api/data/UserAccount.js";


describe("User database tests", () => {
    let adapter = new MockAdapter();
    let client = new Client(adapter);

    afterEach(async () => {
        const ok = await client.deleteAllUsers();
        assert.ok(ok);
        expect(adapter.userAccounts.length).toEqual(0);
    });

    test("Add user", async () => {
        let userAccount = new UserAccount();
        userAccount.name = "John Doe";
        userAccount.email = "john.doe@example.com";
        userAccount.password = "secret";

        let ok;
        let user;

        user = await client.addUser(userAccount);
        expect(user).toBeDefined();
        expect(user.id).toBeDefined();

        user = await client.getUserByName(userAccount.name);
        expect(user.id).toEqual(userAccount.id);
        expect(user.name).toEqual(userAccount.name);
        expect(user.email).toEqual(userAccount.email);
    });

    test("Delete user", async () => {
        let userAccount = new UserAccount();
        userAccount.name = "John Doe";

        let user;
        let ok;

        user = await client.addUser(userAccount);
        expect(user).toBeDefined();
        expect(user.id).toBeDefined();

        ok = await client.deleteUser(userAccount);
        assert.ok(ok);

        user = await client.getUserByName(userAccount.name);
        expect(user).toBeUndefined();
    });

    test("Add multiple users", async () => {
        let userAccount1, userAccount2;
        let found;

        userAccount1 = new UserAccount();
        userAccount1.name = "John Doe 1";
        userAccount1.email = "john.doe.1@example.com";
        userAccount1.password = "secret";

        userAccount2 = new UserAccount();
        userAccount2.name = "John Doe 2";
        userAccount2.email = "john.doe.2@example.com";
        userAccount2.password = "secret";

        await client.addUser(userAccount1);
        await client.addUser(userAccount2);

        found = await client.getUserByName(userAccount1.name);
        expect(found.name).toEqual(userAccount1.name);

        found = await client.getUserByName(userAccount2.name);
        expect(found.name).toEqual(userAccount2.name);
    });

    test("Delete all users", async () => {
        let userAccount1, userAccount2;
        let found;
        let ok;

        userAccount1 = new UserAccount();
        userAccount1.name = "John Doe 1";
        userAccount1.email = "john.doe.1@example.com";
        userAccount1.password = "secret";

        userAccount2 = new UserAccount();
        userAccount2.name = "John Doe 2";
        userAccount2.email = "john.doe.2@example.com";
        userAccount2.password = "secret";

        await client.addUser(userAccount1);
        await client.addUser(userAccount2);

        found = await client.getUserByName(userAccount1.name);
        expect(found.name).toEqual(userAccount1.name);

        found = await client.getUserByName(userAccount2.name);
        expect(found.name).toEqual(userAccount2.name);

        ok = await client.deleteAllUsers();
        assert.ok(ok);

        found = await client.getUserByName(userAccount1.name);
        expect(found).toBeUndefined();

        found = await client.getUserByName(userAccount2.name);
        expect(found).toBeUndefined();
    });
});
