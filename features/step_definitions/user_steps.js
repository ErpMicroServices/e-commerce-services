import gql from 'graphql-tag';
import 'isomorphic-fetch';

var {
	    defineSupportCode
    } = require('cucumber');

defineSupportCode(function ({
	                            Given,
	                            When,
	                            Then
                            }) {

	Given('I have provided my username as {stringInDoubleQuotes}', function (email, callback) {
		this.user.user_id = email;
		callback();
	});

	Given('I have provided my password as {stringInDoubleQuotes}', function (password, callback) {
		this.user.password = password;
		callback();
	});

	Given('a user registered with username = {stringInDoubleQuotes}, password = {stringInDoubleQuotes}', function (user_id, password) {
		console.log("user_id: ", user_id);
		console.log("password: ", password);
		return this.db.one("insert into user_login (user_id, password) values ($1, $2) returning id", [user_id, password])
				.then(data => this.user.id = data.id);
	});


	When('I register', function () {
		this.result = {
			data : null,
			error: null
		};
		return this.client.mutate({
					mutation : gql `mutation register($newUser: NewUser!) {
													  register(newUser: $newUser) {
													    ... on User {
													      user_id
													      id
													      token
													    }
													    ... on Error {
													      path
													      message
													    }
													  }
													}`,
					variables: {
						newUser: {
							user_id : this.user.user_id,
							password: this.user.password
						}
					}
				})
				.then(response => this.result.data = response.data)
				.catch(error => this.result.error = error);

	});

	When('I login', function () {
		this.result = {
			data : null,
			error: null
		};
		return this.client.mutate({
					mutation : gql `mutation login($user_id: String!, $password: String!) {
													  authenticate(user_id: $user_id, password: $password) {
													    user_id
													    id
													    token
													  }
													}`,
					variables: {
						user_id : this.user.user_id,
						password: this.user.password
					}
				})
				.then(response => this.result.data = response)
				.catch(error => this.result.error = error);
	});

	When('I logout', function () {
		this.result = {
			data : null,
			error: null
		};
		return this.client.mutate({
					mutation : gql `mutation logout($user_id: String!) {
        end_authentication(user_id: $user_id)
      }`,
					variables: {
						user_id: this.user.user_id
					}
				})
				.then(response => this.result.data = response)
				.catch(error => this.result.error = error);

	});

	Then('I will be logged in', function (callback) {
		expect(this.result.error, "There should be no errors").to.be.null;
		expect(this.result.data, "There must be data").to.not.be.null;
		let user = {};
		if (this.result.data.register) {
			user = this.result.data.register;
		} else {
			user = this.result.data.data.authenticate;
		}
		expect(user.user_id, "register.user_id is ", user.user_id, " and should be ", this.user.user_id).to.be.equal(this.user.user_id);
		expect(user.id, "id should not be null or nil").to.be.ok;
		callback();
	});

	Then('I will be given a message that says "The username is required"', function (callback) {
		expect(this.result.error).to.be.null;
		expect(this.result.data).to.not.be.null;
		expect(this.result.data.register.path).to.be.equal("user_id");
		expect(this.result.data.register.message).to.be.equal("User login id is required, and must be a valid email address");
		callback();
	});

	Then('I will be given a message that says "The password is required"', function (callback) {
		expect(this.result.error).to.be.null;
		expect(this.result.data).to.not.be.null;
		expect(this.result.data.register.path).to.be.equal("password");
		expect(this.result.data.register.message).to.be.equal("The password is required");
		callback();

	});

	Then('I will be given the message "You have already registered with that username"', function (callback) {
		expect(this.result.error).to.be.null;
		expect(this.result.data).to.not.be.null;
		expect(this.result.data.register.path).to.be.equal("user_id");
		expect(this.result.data.register.message).to.be.equal("A user with the given username is already registered");
		callback();

	});

	Then('I am logged out', function (callback) {
		expect(this.result.error).to.not.be.ok;
		expect(this.result.data).to.be.ok;
		callback();
	});


});
