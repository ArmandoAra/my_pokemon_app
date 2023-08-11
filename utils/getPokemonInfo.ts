import { pokeApi } from "@/api"
import { PokemonDetails } from "@/interfaces"
import { DescriptionData } from "@/interfaces"

export const getPokemonInfo = async (nameOrId: string) => {

    try {
        const { data } = await pokeApi.get<PokemonDetails>(`/pokemon/${nameOrId}`)
        const descriptionData = await pokeApi.get<DescriptionData>(`/pokemon-species/${nameOrId}`)

        return {
            id: data.id,
            name: data.name,
            sprites: data.sprites,
            stats: data.stats,
            description: descriptionData.data.flavor_text_entries[1].flavor_text,
        }
    }
    catch (error) {
        return null
    }

}
