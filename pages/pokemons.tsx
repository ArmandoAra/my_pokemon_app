import { Grid } from '@nextui-org/react'

import { NextPage } from "next"
import { GetStaticProps } from 'next/types'

import { CustomLayout } from '@/components/layouts'
import { PokemonCard } from '@/components/pokemon'
import { pokeApi } from "@/api"

import { PokemonData, PokemonResponse } from "@/interfaces"

interface GenProps {
    allPokemons: PokemonData[],
}

const PokemonsPage: NextPage<GenProps> = ({ allPokemons }) => {

    return (
        <CustomLayout title="Listado de Pokemones" >

            <Grid.Container gap={2} justify='flex-start' >
                {
                    allPokemons.map(({ id, name, image }) => {
                        return (
                            <PokemonCard
                                key={id} id={id}
                                name={name}
                                image={image}
                            />
                        )
                    })
                }
            </Grid.Container>

        </CustomLayout>
    )
}

export const getStaticProps: GetStaticProps = async (ctx) => {

    const { data } = await pokeApi.get<PokemonResponse>('/pokemon?limit=100000&offset=0')

    const allPokemons = data.results.map((pokemon, index) => {
        const id = index + 1

        return {
            id,
            name: pokemon.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
        }
    })

    return {
        props: {
            allPokemons
        }
    }
}

export default PokemonsPage;