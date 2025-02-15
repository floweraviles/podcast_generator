
module.exports = (sequelize, DataTypes, User) => {
    const Podcast = sequelize.define("Podcast", {
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        title: { type: DataTypes.STRING, allowNull: false },
        script: { type: DataTypes.TEXT },
        audioURL: { type: DataTypes.STRING },
        userId: { type: DataTypes.UUID, references: { model: User, key: "id" } },
    });

    //Define Associations 
Podcast.associate = (models) => {
    Podcast.belongsTo(models.User, { foreignKey: "userId", onDelete: "CASCADE" });

    };
    return Podcast;
};



