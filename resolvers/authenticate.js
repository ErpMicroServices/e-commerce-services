import jwt from "jsonwebtoken";

export default function (obj, args, context, graphql) {
	let {user_id, password} = args;
	return context.e_commerce_db.one("select id, user_id, password from user_login where user_id = $1 and password=$2", [args.user_id, args.password])
			.then(data => {
				var token = jwt.sign({
					username: args.user_id,
					id      : data.id
				}, context.jwt.secret);
				return {
					user_id: data.user_id,
					id     : data.id,
					token
				};
			})
			.catch(error => {
				console.log(`Couldn't authenticate user with user_id of ${args.user_id} because ${error}>`);
				return {};
			});
}