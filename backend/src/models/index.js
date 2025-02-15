const fs = require("fs");
const path = require("path");
const { Sequelize } = require("sequelize");
const sequelize = require("../config/db");


const db = { sequelize, Sequelize };

fs.readdirSync(__dirname)
.filter((file) => file !== "index.js" && file.endsWith(".js"))
.forEach((file) => {
    const model = require(path.join(__dirname, file)) (sequelize, Sequelize.DataTypes)
    db[model.name] = model;
});

Object.keys(db).forEach((modeName) => {
    if (db[modeName].associate) {
        db[modeName].associate(db);
    }
});

module.exports = db;