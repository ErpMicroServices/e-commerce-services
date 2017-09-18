import fs from "fs";

class Config {

	constructor() {
		this._currentEnvironment = process.env.NODE_ENV || defaultEnvironment();
		if (this._currentEnvironment == defaultEnvironment()) {
			this._config = {
				e_commerce_db: {
					host    : process.env.DATABASE_HOST || 'e-commerce-db',
					port    : process.env.DATABASE_PORT || 5432,
					database: process.env.DATABASE_DATABSE || 'ems_ecommerce',
					user    : process.env.DATABASE_USER || 'ems_ecommerce',
					password: process.env.DATABASE_PASSWORD || 'ems_ecommerce'
				},
				graphql      : {
					graphiql   : process.env.GRAPHIQL || true,
					endpointURL: process.env.ENDPOINT_URL || '/api/walker_knocker/admin/graphql'
				},
				jwt          : {
					secret: process.env.JWT_SECRET || "this is an incredible secret.  the best secret in the world",
					header: process.env.JWT_HEADER || "authorization"
				},

				party_db: {
					host    : process.env.DATABASE_HOST || 'party-db',
					port    : process.env.DATABASE_PORT || 5432,
					database: process.env.DATABASE_DATABSE || 'party_database',
					user    : process.env.DATABASE_USER || 'party_database',
					password: process.env.DATABASE_PASSWORD || 'party_database'
				},
				server  : {
					port   : process.env.SERVER_PORT || 80,
					name   : process.env.SERVER_NAME || "e-commerce-user-service",
					version: process.env.SERVER_VERSION || "0.1.0",
					url    : process.env.SERVER_URL || "http://localhost/api/e-commerce/user"
				}
			};
		} else {
			this._config = JSON.parse(fs.readFileSync(`config.${this.currentEnvironment}.json`, "utf8"));
		}
	}

	get currentEnvironment() {
		return this._currentEnvironment;
	}

	get e_commerce_db() {
		return this._config.e_commerce_db;
	}

	get graphql() {
		return this._config.graphql;
	}

	get jwt() {
		return this._config.jwt;
	}

	get party_db() {
		return this._config.party_db;
	}

	get server() {
		return this._config.server;
	}

}

const config = new Config();
export default config;

export function defaultEnvironment() {
	return "default";
}

export function developmentEnvironment() {
	return "dev";
}

export function environments() {
	return [Config.defaultEnvironment(), Config.localEnvironment(), Config.developmentEnvironment(), Config.qaEnvironment(), Config.qaEnvironment(), Config.stagingEnvironment(), Config.prodEnvironment()];
}

export function localEnvironment() {
	return "local";
}

export function prodEnvironment() {
	return "prod";
}

export function qaEnvironment() {
	return "qa";
}

export function stagingEnvironment() {
	return "staging";
}
