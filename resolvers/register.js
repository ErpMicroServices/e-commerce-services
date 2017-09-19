export default function (obj, args, context, graphql) {
	db.one("insert into user_login(user_id, password) values($1, $2) returning id", [args.user_id, args.password])
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
				let errors = [];
				if (error.message.includes('user_login_user_id_key')) {
					errors.push({
						path   : '',
						message: "A user with the given username is already registered"
					});
				} else {
					errors.push({
						path   : '',
						message: error.message
					});
				}
				return errors;
			});
}