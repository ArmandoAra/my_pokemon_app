import { pokeApi } from "@/api"
import { GenerationsCards } from "@/interfaces"

export const getReg = async () => {

    try {
        const { data } = await pokeApi.get<GenerationsCards>(`/generation`)

        const genList = data.results.map((gen) => {
            return {
                name: gen.name,
                url: gen.url
            }
        })

        return genList

    }
    catch (error) {
        return null
    }

}
