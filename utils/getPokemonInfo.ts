import { pokeApi } from "@/api"
import { PokemonDetails } from "@/interfaces"


export const getPokemonInfo = async (nameOrId: string) => {

    const { data } = await pokeApi.get<PokemonDetails>(`/pokemon/${nameOrId}`)

    //Voy a enviar solo los datos que necesito
    return {
        id: data.id,
        name: data.name,
        sprites: data.sprites,
    }
}
