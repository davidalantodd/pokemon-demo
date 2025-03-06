const { db, DataTypes, Model } = require('../db/connection')

class Trainer extends Model {}

Trainer.init(
    {
        name: DataTypes.STRING
    },
    {
        sequelize: db,
        modelName: "Trainer"
    }
);

module.exports = Trainer;