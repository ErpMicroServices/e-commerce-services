import jwt from "jsonwebtoken";

export default function (obj, args, context, graphql) {
	let {user_id, password} = args.newUser;
	if (!user_id) {
		return {
			path   : "user_id",
			message: "User login id is required, and must be a valid email address"
		};
	}
	if (!password) {
		return {
			path   : "password",
			message: "The password is required"
		};
	}
	return context.e_commerce_db.one("insert into user_login(user_id, password) values($1, $2) returning id", [args.newUser.user_id, args.newUser.password])
			.then(data => {

				var token = jwt.sign({
					user_id: args.newUser.user_id,
					id     : data.id
				}, context.jwt.secret);
				return {
					user_id: args.newUser.user_id,
					id     : data.id,
					token
				};
			})
			.catch(error => {
				let errorResult = {};
				if (error.message.includes('user_login_user_id_key')) {
					errorResult = {
						path   : 'user_id',
						message: "A user with the given username is already registered"
					};
				} else {
					errorResult = {
						path   : '',
						message: error.message
					};
				}
				return errorResult;
			});
}