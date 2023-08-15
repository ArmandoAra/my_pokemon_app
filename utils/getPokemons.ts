import { pokeApi } from "@/api"
import { GenerationList } from "@/interfaces"

///Resolver la promesa y entender que fue lo que devolvio
export const getPokemons = async (genNumber: string) => {

    const sprite_A: string = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"

    try {
        const { data } = await pokeApi.get<GenerationList>(`/generation/${genNumber}`)

        const sprite = data.pokemon_species.map((pokemon) => {
            const url = pokemon.url.split('/')
            const id = url[url.length - 2]
            return `${sprite_A}${id}.png`
        }

        )

        return {
            pokemon_species: data.pokemon_species,
            sprite,
        }

    }
    catch (error) {
        return null
    }

}
