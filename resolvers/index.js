// resolvers/index.js

import authenticate from "./authenticate";
import end_authentication from "./end_authentication";
import register from "./register";

export default {
	Mutation: {
		authenticate,
		end_authentication,
		register
	},
	Query   : {}
};

