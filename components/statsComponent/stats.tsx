import { Container, Text, Grid } from '@nextui-org/react'

import { PokemonDetails } from '@/interfaces'

interface PokeProps {
    pokemons: PokemonDetails,
}

export const Stats = ({ pokemons }: PokeProps) => {
    const { stats } = pokemons

    return (
        <Container direction='column' display='flex' gap={0}>
            {stats.map((stat, index) => (
                <Grid key={index} css={{ 'display': 'flex', 'justify-content': 'space-between' }}>
                    <Text h4 transform='uppercase'> {stat.stat.name}</Text>
                    <Text h4 transform='uppercase'> {stat.base_stat}</Text>
                </Grid>
            ))}
        </Container>
    )
}
