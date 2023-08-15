import { pokeApi } from "@/api"
import { PokemonDetails } from "@/interfaces"
import { DescriptionData } from "@/interfaces"

export const getPokemonInfo = async (nameOrId: string) => {

    try {
        const { data } = await pokeApi.get<PokemonDetails>(`/pokemon/${nameOrId}`)

        const descriptionData = await pokeApi.get<DescriptionData>(`/pokemon-species/${nameOrId}`)
        const englishDescription = descriptionData.data.flavor_text_entries.find((description) => description.language.name === "en")


        return {
            id: data.id,
            name: data.name,
            sprites: data.sprites,
            stats: data.stats,
            description: englishDescription?.flavor_text || "No description",
        }
    }
    catch (error) {
        return null
    }

}
