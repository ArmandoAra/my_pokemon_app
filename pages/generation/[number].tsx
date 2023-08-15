
import { NextPage } from "next"
import { GetStaticPaths } from 'next'
import { GetStaticProps } from 'next/types'
import { Grid } from '@nextui-org/react'

import { CustomLayout } from '@/components/layouts'
import { GenerationList } from '@/interfaces'
import { getPokemons } from '@/utils/getPokemons'
import { Species } from '../../interfaces/pokemon-full-data';
import { PokemonCard } from '@/components/pokemon'

interface GenProps {
    pokemons: GenerationList,
}

const PokemonByGenerationPage: NextPage<GenProps> = ({ pokemons }) => {
    const { pokemon_species, sprite } = pokemons

    return (
        <CustomLayout title="Listado de Pokemones" >

            <section className="pokemon_region_section">

                <Grid.Container gap={2} justify='flex-start' >
                    {
                        pokemon_species.map((pokemon: Species, index) => (
                            <PokemonCard
                                key={index}
                                name={pokemon.name}
                                id={pokemon.url.split('/')[6]}
                                image={sprite[index]} />
                        ))
                    }
                </Grid.Container>
            </section>
        </CustomLayout>
    )
}


export const getStaticPaths: GetStaticPaths = async (ctx) => {

    const numberOfGen = [...Array(9)].map((value, index) => `${index + 1}`)

    return {
        paths: numberOfGen.map(number => ({
            params: { number }
        })),
        fallback: 'blocking',
    }
}

export const getStaticProps: GetStaticProps = async (ctx) => {

    const { number } = ctx.params as { number: string }

    const pokemons = await getPokemons(number)

    return {
        props: {
            pokemons,
        }
    }
}

export default PokemonByGenerationPage;