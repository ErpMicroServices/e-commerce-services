import ApolloClient, {createNetworkInterface} from 'apollo-client';
// features/support/world.js
import config from "./config";
import database from "./database";
import user_or_error_fragment_matcher from "./user_or_error_fragment_matcher";

var {
	    defineSupportCode
} = require('cucumber');

const client = new ApolloClient({
	fragmentMatcher : user_or_error_fragment_matcher,
	networkInterface: createNetworkInterface({
		uri: 'http://localhost/api/e-commerce/user/graphql',
	}),
});

function CustomWorld() {
	this.client = client;
	this.config = config;
	this.db     = database;
	this.user   = {
		user_id : '',
		password: ''
	};

	this.result = {
		error: null,
		data : null
	};
}

defineSupportCode(function({
	                           setWorldConstructor
}) {
	setWorldConstructor(CustomWorld);
});
