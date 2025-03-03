// import fs.readFile and fs.writeFile
const { readFile, writeFile } = require("fs").promises;
const path = require("path");
const POKEMON_FILE_PATH = path.join(__dirname, "pokemon.json") // stores the file path of the pokemon.json file

//defining async function
async function main() {
    let bulbasaur = {
        name: "Bulbasaur",
        type: "Grass"
    }

    let pokemonArray = []
    pokemonArray.push(bulbasaur)

    console.log("My Pokemon (in array):", pokemonArray)

    const squirtle = {
        name: "Squirtle",
        type: "Water"
    }

    pokemonArray.push(squirtle)
    console.log("My Pokemon (in array):", pokemonArray)

    console.log("file path of json", POKEMON_FILE_PATH)

    // read file contents
    const buffer = await readFile(POKEMON_FILE_PATH);   // await
    const pokemonDB = JSON.parse(buffer)

    console.log("Loaded Pokemon:", pokemonDB)

    // write contents to file
    pokemonDB.push(bulbasaur)
    pokemonDB.push(squirtle)
    console.log(pokemonDB)

    const saveText = JSON.stringify(pokemonDB)
    await writeFile(POKEMON_FILE_PATH, saveText)    // writes udpated data with 2 new pokemon to our file

    console.log("Wrote out the pokemon data to the json file")

    /* Alterate way to use async javascript - .then() syntax */

    // read file contents
    // readFile(POKEMON_FILE_PATH)
    //     .then((buffer) => {
    //         const pokemonDB = JSON.parse(buffer)

    //         console.log("Loaded Pokemon:", pokemonDB)

    //         // write contents to file
    //         pokemonDB.push(bulbasaur)
    //         pokemonDB.push(squirtle)
    //         console.log(pokemonDB)

    //         const saveText = JSON.stringify(pokemonDB)
    //         return writeFile(POKEMON_FILE_PATH, saveText)    // writes udpated data with 2 new pokemon to our file
    //     })
    //     .then(() => {
    //         console.log("Wrote out the pokemon data to the json file")
    //     })
    //     .catch((err) => {
    //         console.error("Error:", err)
    //     })

}

main();