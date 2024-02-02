const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

db.run("CREATE TABLE Points (x INTEGER, y INTEGERS, PRIMARY KEY(x,y))");


db.close();