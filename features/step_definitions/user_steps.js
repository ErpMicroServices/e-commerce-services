import "isomorphic-fetch"

var {
    defineSupportCode
} = require('cucumber');

defineSupportCode(function({
    Given,
    When,
    Then
}) {

    Given('I have provided my username as {email:stringInDoubleQuotes}', function(email, callback) {
        this.user.user_id = email;
        callback();
    });

    Given('I have provided my password as {password:stringInDoubleQuotes}', function(password, callback) {
        this.user.password = password;
        callback();
    });

    Given('a user registered with username = {user_id:stringInDoubleQuotes}, password = {password:stringInDoubleQuotes}', function(user_id, password) {
        return fetch("http://localhost/api/e-commerce/user/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id,
                    password
                })
            })
            .then((response) => response.json())
    });


    When('I register', function() {
        return fetch("http://localhost/api/e-commerce/user/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(this.user)
            })
            .then((response) => this.result.data = response)
            .catch((error) => this.error = error)

    });

    When('I login', function() {
        return fetch("http://localhost/api/e-commerce/user/authenticate", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(this.user)
            })
            .then((response) => this.result.data = response)
            .catch((error) => this.error = error)

    });

    When('I logout', function() {
        return fetch("http://localhost/api/e-commerce/user/authenticate", {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'JWT ' + this.result.data
                }
            })
            .then((response) => this.result.data = response)
            .catch((error) => this.error = error)
    });

    Then('I will be logged in', function(callback) {
        expect(this.result.error).to.not.be.ok;
        expect(this.result.data).to.be.ok;
        expect(this.result.data.status).to.be.equal(200);
        this.result.data.json()
            .then((data) => {
                expect(data.token).to.be.ok;
                callback();
            })
            .catch((error) => callback(error));
    });

    Then('I will be given a message that says "The username is required"', function(callback) {
        expect(this.result.error).to.not.be.ok;
        expect(this.result.data).to.be.ok;
        expect(this.result.data.status).to.be.equal(400);
        this.result.data.json()
            .then((data) => {
                expect(data).to.be.an.instanceof(Array);
                expect(data.length).to.be.equal(1);
                expect(data[0].path).to.be.equal("user_id");
                expect(data[0].message).to.be.equal("User login id is required, and must be a valid email address");
                callback();
            })
            .catch((error) => callback(error));
    });

    Then('I will be given a message that says "The password is required"', function(callback) {
        expect(this.result.error).to.not.be.ok;
        expect(this.result.data).to.be.ok;
        expect(this.result.data.status).to.be.equal(400);
        this.result.data.json()
            .then((data) => {
                expect(data).to.be.an.instanceof(Array);
                expect(data.length).to.be.equal(1);
                expect(data[0].path).to.be.equal("password");
                expect(data[0].message).to.be.equal("Password is required");
                callback();
            })
            .catch((error) => callback(error));
    });

    Then('I will be given the message "You have already registered with that username"', function(callback) {
        expect(this.result.error).to.not.be.ok;
        expect(this.result.data).to.be.ok;
        expect(this.result.data.status).to.be.equal(400);
        this.result.data.json()
            .then((data) => {
                expect(data).to.be.an.instanceof(Array);
                expect(data.length).to.be.equal(1);
                expect(data[0].path).to.be.equal("");
                expect(data[0].message).to.be.equal("A user with the given username is already registered");
                callback();
            })
            .catch((error) => callback(error));
    });

    Then('I am logged out', function(callback) {
        expect(this.result.error).to.not.be.ok;
        expect(this.result.data).to.be.ok;
        expect(this.result.data.status).to.be.equal(204);
        expect(this.result.data.headers.get('Authorization')).to.not.be.ok;
        callback();
    });


});
