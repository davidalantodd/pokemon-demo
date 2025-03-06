const Pokemon = require("./Pokemon")
const Trainer = require("./Trainer")
const Badge = require("./Badge")

// define 1:n (one to many) association between Trainer and Pokemon
Trainer.hasMany(Pokemon)
Pokemon.belongsTo(Trainer)

// add m:n association (many to many) association between Trainer and Badge, using through table "TrainerBadges"
Trainer.belongsToMany(Badge, { through: "TrainerBadges" })
Badge.belongsToMany(Trainer, { through: "TrainerBadges" })

module.exports = {
    Pokemon,
    Trainer,
    Badge
}