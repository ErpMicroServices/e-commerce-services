import jwt from "jsonwebtoken";

export default function (obj, args, context, graphql) {
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
						path   : '',
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