import Error from "./error";
import NewUser from "./new_user";
import Result from "./result";
import User from "./user";
import AuthenticateResponse from "./user_or_error";
import UserOrError from "./user_or_error";


const Query = `
type Query {
	info( id: String!): User
}
`;

const Mutation = `
type Mutation {
	authenticate(user_id:String!, password:String!): User
	end_authentication(user_id:String!): Result!
	register( newUser:NewUser!): UserOrError!
}
`;

const Schema = `
schema {
  query: Query
  mutation: Mutation
 
}
`;

export default [
	AuthenticateResponse,
	Error,
	Mutation,
	NewUser,
	Query,
	Result,
	Schema,
	User,
	UserOrError
];