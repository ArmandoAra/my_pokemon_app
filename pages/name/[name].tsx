import { useState, useEffect } from 'react'

import { NextPage } from "next"
import { GetStaticPaths } from 'next'
import { GetStaticProps } from 'next/types'
import { Image, Button, Grid, Card, Text, Container } from '@nextui-org/react'

import confetti from 'canvas-confetti'

import { pokeApi } from '../../api'
import { getPokemonInfo, inFavorites, toggleFavorite } from '../../utils'
import { CustomLayout } from '@/components/layouts'
import { PokemonDetails } from '@/interfaces'

import { PokemonStats } from '@/containers/stats/pokemonStatsContainer'
import { PokemonSpritesContainer } from '@/containers/sprites/pokemonSpritesContainer'
import { PokemonDescription } from '../../components/description/pokemonDescription'
import { PokemonImage } from '@/components/pokemonImage/image'

interface PokeProps {
    pokemon: PokemonDetails,
}

const PokemonByNamePage: NextPage<PokeProps> = ({ pokemon }) => {
    const { name, sprites } = pokemon

    const [isInFavorites, setIsInFavorites] = useState(false);

    useEffect(() => {
        setIsInFavorites(inFavorites(pokemon.id));
    }, [pokemon.id]);

    const onToggleFavorite = () => {
        setIsInFavorites(!isInFavorites);
        toggleFavorite(pokemon.id);

        if (!isInFavorites) {
            confetti({
                zIndex: 10000,
                particleCount: 100,
                spread: 170,
                angle: 270,
                origin: { x: 0.5, y: 0.02 },
            });
        }

    };


    return (
        <CustomLayout title={name} >

            <Grid.Container css={{ marginTop: '5px' }} gap={2}>

                <PokemonImage name={name} sprites={sprites} />

                <Grid xs={12} sm={8}>
                    <Card>
                        <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Text h1 transform='capitalize'>{name}</Text>

                            <Button
                                color="primary"
                                onPress={onToggleFavorite}
                                ghost={!isInFavorites}
                            >
                                {isInFavorites ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                            </Button>
                        </Card.Header>

                        <PokemonSpritesContainer pokemon={pokemon} />

                    </Card>
                </Grid>


                <Container direction='row' display='flex' gap={0}>

                    {/* Pokemon Stats */}
                    <PokemonStats statsDetails={pokemon} />

                    {/* Pokemon description */}
                    <PokemonDescription description={pokemon.description} />
                </Container>

            </Grid.Container>

        </CustomLayout>
    )
}


export const getStaticPaths: GetStaticPaths = async (ctx) => {

    const { data } = await pokeApi.get<PokemonDetails>(`https://pokeapi.co/api/v2/pokemon?limit=1200`)
    const pokemonNames = data.results.map(pokemon => pokemon.name)
    const filteredStrings = pokemonNames.filter(string => !string.includes('-'));


    return {
        paths: filteredStrings.map(name => ({
            params: { name }
        })),
        fallback: 'blocking',
    }
}



export const getStaticProps: GetStaticProps = async (ctx) => {

    const { name } = ctx.params as { name: string }

    const pokemon = await getPokemonInfo(name)


    if (!pokemon) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    return {
        props: {
            pokemon
        }
    }
}

export default PokemonByNamePage;