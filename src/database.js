var pgp = require('pg-promise')();
import config from "./config"

const party_db      = pgp(config.party_db);
const e_commerce_db = pgp(config.e_commerce_db);

export {party_db, e_commerce_db};
