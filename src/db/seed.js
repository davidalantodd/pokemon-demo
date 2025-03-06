const { db } = require("./connection")
const { pokemon, trainers, badges } = require("./seedData")
const { Pokemon, Trainer, Badge} = require("../models/index")


async function seed() {
    await db.sync({force: true});   // clearing database each run

    await Pokemon.bulkCreate(pokemon);
    await Trainer.bulkCreate(trainers);
    await Badge.bulkCreate(badges);
}

seed();