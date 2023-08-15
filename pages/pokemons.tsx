
import { NextPage } from "next"
import { GetStaticPaths } from 'next'
import { GetStaticProps } from 'next/types'
import { Grid } from '@nextui-org/react'

import { CustomLayout } from '@/components/layouts'


import { PokemonCard } from '@/components/pokemon'


import { PokemonData, PokemonResponse } from "@/interfaces"
import { pokeApi } from "@/api"

interface GenProps {
    allPokemons: PokemonData[],
}

const PokemonsPage: NextPage<GenProps> = ({ allPokemons }) => {


    return (
        <CustomLayout title="Listado de Pokemones" >

            <div>
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
            </div>
        </CustomLayout>
    )
}


export const getStaticProps: GetStaticProps = async (ctx) => {


    const { data } = await pokeApi.get<PokemonResponse>('/pokemon?limit=100000&offset=0')

    const allPokemons = data.results.map((pokemon, index) => {

        // Separamos el id del url del pokemon
        const id = index + 1

        // retornamos los datos que nos interesan
        return {
            id,
            name: pokemon.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
            // image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg` // Images mas grandes
        }
    })


    return {
        props: {
            allPokemons
        }
    }
}


export default PokemonsPage;