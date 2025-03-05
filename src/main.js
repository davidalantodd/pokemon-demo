const Pokemon = require("./models/Pokemon");
const { db } = require("./db/connection") 

//defining async function
async function main() {
    await db.sync({force: true});   // clearing database each run

    console.log("\n********** CREATE **********")

    const Pikachu = await Pokemon.create({
        name: "Pikachu",
        type: "Electric",
        weight: 6
    })

    console.log(JSON.stringify(Pikachu, null, 2))

    await Pokemon.bulkCreate([
        {
            name: "Bulbasaur",
            type: "Grass/Poison",
            weight: 6.9,
        },
        {
            name: "Charmander",
            type: "Fire",
            weight: 8.5,
        },
        {
            name: "Squirtle",
            type: "Water",
            weight: 9,
        },
    ])

    console.log("\n********** READ **********");

    const allPokmeon = await Pokemon.findAll();
    console.log("all pokemon", JSON.stringify(allPokmeon, null, 2))

    const bulbasaur = await Pokemon.findByPk(2);
    console.log("bulbasaur", JSON.stringify(bulbasaur, null, 2))

    const waterPokemon = await Pokemon.findOne(
        {
            where : {
                type: "Water"
            }
        }
    )
    console.log("water pokmeon", JSON.stringify(waterPokemon, null, 2))

    console.log("\n********** UPDATE **********")
    const updatedPokemon = await bulbasaur.update({
        name: "Ivysaur",
        weight: 31
    })
    console.log("updatedPokemon", JSON.stringify(updatedPokemon, null, 2))

    const updatedResult = await Pokemon.update(
        { name: "Wartortle", weight: 18}, // updating values
        { where: { name: "Squirtle" } } // where clause to tell it which records to update
    )

    console.log(updatedResult) // returns array with number of affected rows

    console.log("\n********** DELETE **********")
    const charmander = await Pokemon.findOne({
        where: {name: "Charmander"}
    })
    const deletedPokmeon = await charmander.destroy();
    console.log("deletedPokmeon", JSON.stringify(deletedPokmeon, null, 2))

    const deleteResult = await Pokemon.destroy({ where: { name: "Wartortle" } })
    console.log(deleteResult)


}

main();