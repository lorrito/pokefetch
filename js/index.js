"use strict"

const maxPokemonsRange = 500;
let newCombo = 0;
let pokemonName = "";
let correctPokemon = "";
let pokemonNames = $(".buttons");
let pokemonImage = $("#pokemon-image");
let pokemonContainer = $("#image-container");
let correctCombo = $("#combo");
let gameStarted = false;
let apiURL = "https://pokeapi.co/api/v2/pokemon/";

function selectRandomNumber(min, max) {
    return Math.floor(Math.random() * max + min);
}

function nextPokemon() {
    pokemonImage.toggleClass("hidden");
    pokemonNames.prop("disabled", true);
    setTimeout(() => {
        getPokemon();
        pokemonImage.toggleClass("hidden");
        pokemonNames.prop("disabled", false);
    }, 1500);
}

function guessPokemon(pokemonGuess) {
    if (pokemonGuess === pokemonName) {
        newCombo = parseInt(correctCombo.text()) + 1;
        correctCombo.text(newCombo);
        nextPokemon();
    }
    else {
        correctCombo.text("0");
        nextPokemon();
    }
}

function shufflePokemons(pkLst) {
    for (let i = pkLst.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pkLst[i], pkLst[j]] = [pkLst[j], pkLst[i]];
    };
}

async function getPokemon() {
    let pokemonList = [];

    for (let i = 0; i < 4; i++) {
        let id = selectRandomNumber(1, 500);
        try {
            let response = await fetch(apiURL + id);
            var data = await response.json();
            pokemonName = data.name;
            pokemonList.push(pokemonName);
        } catch {
            console.error("Something went wrong");
        }
    };
    pokemonImage.attr("src", data.sprites.other["official-artwork"].front_default);
    shufflePokemons(pokemonList);
    pokemonNames.each(function (index) {
        $(this).text(pokemonList[index]);
    });
    gameStarted = true;
};

pokemonImage.toggleClass("hidden");
getPokemon();

pokemonNames.on("click", function() {
    if (gameStarted) {
        guessPokemon($(this).text());
    }
});