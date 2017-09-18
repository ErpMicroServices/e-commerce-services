import NewUser from "./new-user";
import Result from "./result";
import User from "./user";


const Query = `
type Query {
	info( id: String!): User
}
`;

const Mutation = `
type Mutation {
	authenticate(user_id:String!, password:String!): User
	end_authentication(user_id:String!): Result!
	register( newUser:NewUser!): User
}
`;

const Schema = `
schema {
  query: Query
  mutation: Mutation
}
`;

export default [
	Mutation,
	NewUser,
	Query,
	Result,
	Schema,
	User
];