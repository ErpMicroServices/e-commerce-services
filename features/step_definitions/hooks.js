// features/step_definitions/hooks.js

var {
	    defineSupportCode
    } = require('cucumber');

defineSupportCode(function ({
	                            Before,
	                            After
                            }) {

	Before(function (result, callback) {
		this.result = {
			data : null,
			error: null
		};
		this.user   = {
			user_id : '',
			password: ''
		};
		this.db.none("delete from user_login")
				.then((data) => callback())
				.catch((error) => callback(error));
	});

	After(function () {});
});
