const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user");

const Podcast = sequelize.define("Podcast", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    script: { type: DataTypes.TEXT },
    audioURL: { type: DataTypes.STRING },
    userId: { type: DataTypes.UUID, references: { model: User, key: "id" } },
});

User.hasMany(Podcast);
Podcast.belongsTo(User);

module.exports = Podcast;