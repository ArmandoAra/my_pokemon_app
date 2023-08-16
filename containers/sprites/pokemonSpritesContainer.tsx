import { Image, Card, Text, Container } from '@nextui-org/react'

import { PokemonDetails } from '@/interfaces'


interface PokeProps {
    pokemon: PokemonDetails,
}

export const PokemonSpritesContainer = ({ pokemon }: PokeProps) => {
    return (
        <Card.Body>
            <Text size={30}>Sprites:</Text>

            <Container direction='row' display='flex' gap={0}>
                <Image
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    width={100}
                    height={100}
                />
                {pokemon.sprites.back_default ?
                    <Image
                        src={pokemon.sprites.back_default}
                        alt={pokemon.name}
                        width={100}
                        height={100}
                    /> : null
                }
                {pokemon.sprites.front_shiny ?
                    <Image
                        src={pokemon.sprites.front_shiny}
                        alt={pokemon.name}
                        width={100}
                        height={100}
                    /> : null
                }
                {pokemon.sprites.back_shiny ?
                    <Image
                        src={pokemon.sprites.back_shiny}
                        alt={pokemon.name}
                        width={100}
                        height={100}
                    /> : null
                }


            </Container>


        </Card.Body>

    )
}
