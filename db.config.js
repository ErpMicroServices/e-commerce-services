import pgp from 'pg-promise';
import config from "./config";

const database = pgp(config.database);

export default database;
