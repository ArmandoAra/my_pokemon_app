import { pokeApi } from "@/api"
import { GenerationList } from "@/interfaces"


export const getPokemons = async (genNumber: string) => {

    try {
        const { data } = await pokeApi.get<GenerationList>(`/generation/${genNumber}`)

        // Sort the pokemon_species array by id because the api doesn't return the array sorted
        const pokemon_species = data.pokemon_species.sort((a, b) => {
            if (Number(a.url.split('/')[6]) > Number(b.url.split('/')[6])) {
                return 1;
            }
            if (Number(a.url.split('/')[6]) < Number(b.url.split('/')[6])) {
                return -1;
            }
            return 0;
        });

        const sprite = data.pokemon_species.map((pokemon) => {
            const url = pokemon.url.split('/')
            const id = url[url.length - 2]
            return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
        }

        )

        return {
            pokemon_species,
            sprite,
        }

    }
    catch (error) {
        return null
    }

}
