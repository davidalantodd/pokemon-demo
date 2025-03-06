const { Pokemon, Trainer, Badge } = require("./models/index.js"); // require from associations file
const { db } = require("./db/connection") 

//defining async function
async function main() {

    const trainers = await Trainer.findAll();
    const pokemon = await Pokemon.findAll();
    const badges = await Badge.findAll();

    console.log("********** ONE-TO-MANY **********");
    await trainers[0].addPokemon(pokemon[0]); // id 1
    await trainers[0].addPokemons([pokemon[1], pokemon[2]]); // ids 2, 3
    await trainers[1].addPokemon(4); // adding by id (id=4)
    await trainers[1].addPokemons([5, 6, 7]) // ids= 5, 6, 7

    const red = await Trainer.findByPk(1);
    console.log("red trainer:", JSON.stringify(red, null, 2));
    const redPokemon = await red.getPokemons();
    console.log("redPokemon:", JSON.stringify(redPokemon, null, 2));

    // use eager loading to get blue trainer and pokemon data
    const blue = await Trainer.findOne({
        where: {
            name: "Blue"
        },
        // eager loading
        include: Pokemon
    })
    console.log("blue trainer with pokemon:", JSON.stringify(blue, null, 2));

    console.log("********** MANY-TO-MANY **********");
    await trainers[0].addBadge(badges[0]) // id = 1, adding badge to red trainer
    await blue.addBadges([1, 2, 3]);
    const trainersWithBadges = await Trainer.findAll({ include: [Badge, Pokemon] }) // eager loading example with multiple models
    console.log("trainersWithBadges:", JSON.stringify(trainersWithBadges, null, 2));
}

main();