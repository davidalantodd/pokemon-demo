// import db instance from connection.js
const { db, DataTypes, Model } = require('../db/connection')

class Pokemon extends Model {}

// initializing our Pokemon model and passing in the schema object and the connection object
Pokemon.init(
    {
        name: DataTypes.STRING,
        type: DataTypes.STRING,
        weight: DataTypes.DECIMAL(10, 2)
    },
    {
        sequelize: db,
        modelName: "Pokemon"
    }
);

module.exports = Pokemon;