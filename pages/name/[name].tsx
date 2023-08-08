import { useState, useEffect } from 'react'

import { useRouter } from 'next/router'
import { NextPage } from "next"
import { GetStaticPaths } from 'next'
import { GetStaticProps } from 'next/types'
import { Image, Button, Grid, Card, Text, Container } from '@nextui-org/react'

import confetti from 'canvas-confetti'

import { CustomLayout } from '@/components/layouts'
import { pokeApi } from '../../api'
import { PokemonDetails } from '@/interfaces'
import { getPokemonInfo, inFavorites, toggleFavorite } from '../../utils'




interface PokeProps {
    pokemon: PokemonDetails,
}

const PokemonByNamePage: NextPage<PokeProps> = ({ pokemon }) => {
    const { name } = pokemon

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
                <Grid xs={12} sm={4} >
                    <Card isHoverable css={{ padding: '30px' }}>
                        <Card.Body>
                            <Card.Image
                                src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
                                alt={name}
                                width="100%"
                                height={200}
                            />
                        </Card.Body>
                    </Card>
                </Grid>

                <Grid xs={12} sm={8}>
                    <Card>
                        <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Text h1 transform='capitalize'>{pokemon.name}</Text>

                            <Button
                                color="gradient"
                                onPress={onToggleFavorite}
                                ghost={isInFavorites}
                            >
                                {isInFavorites ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                            </Button>
                        </Card.Header>

                        <Card.Body>
                            <Text size={30}>Sprites:</Text>

                            <Container direction='row' display='flex' gap={0}>
                                <Image
                                    src={pokemon.sprites.front_default}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                                <Image
                                    src={pokemon.sprites.back_default}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                                <Image
                                    src={pokemon.sprites.front_shiny}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                                <Image
                                    src={pokemon.sprites.back_shiny}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />

                            </Container>


                        </Card.Body>


                    </Card>
                </Grid>

            </Grid.Container>
        </CustomLayout>
    )
}


export const getStaticPaths: GetStaticPaths = async (ctx) => {

    const { data } = await pokeApi.get<PokemonDetails>(`https://pokeapi.co/api/v2/pokemon?limit=151`)
    const pokemonNames = data.results.map(pokemon => pokemon.name)

    // const pokemonList = [...Array(data.results)].map((value, index) => value.map(value => value.name))

    return {
        paths: pokemonNames.map(name => ({
            params: { name }
        })),
        fallback: false,
    }
}



export const getStaticProps: GetStaticProps = async (ctx) => {

    const { name } = ctx.params as { name: string }

    return {
        props: {
            pokemon: await getPokemonInfo(name)
        }
    }
}

export default PokemonByNamePage;