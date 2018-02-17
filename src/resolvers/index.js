// resolvers/index.js
import {__resolveType} from 'graphql-tools'

import authenticate from "./authenticate"
import end_authentication from "./end_authentication"
import register from "./register"

export default {
	Mutation: {
		authenticate,
		end_authentication,
		register

	},
	Query   : {},
	UserOrError: {
		__resolveType(data, context, info) {
			if (data.id) {
				return "User";
			} else {
				return "Error";
			}
		}
	}
};

