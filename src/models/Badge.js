const { db, DataTypes, Model } = require('../db/connection')

class Badge extends Model {}

Badge.init(
    {
        name: DataTypes.STRING
    },
    {
        sequelize: db,
        modelName: "Badge"
    }
);

module.exports = Badge;