import { useRouter } from 'next/router'
import { Card, Grid } from '@nextui-org/react';

interface favoriteCardPokemonProps {
    pokemonId: number
}

export const FavoriteCardPokemon = ({ pokemonId }: favoriteCardPokemonProps) => {

    const router = useRouter()

    // Aqui mandamos a la pagina de cada pokemon
    const handleClick = () => {
        router.push(`/pokemon/${pokemonId}`)
    }

    return (
        <Grid xs={6} sm={3} md={2} xl={1} key={pokemonId} >
            <Card
                isHoverable
                isPressable
                onPress={handleClick}
                css={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
            >
                <Card.Image
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`}
                    width={100}
                    height={100}
                    alt={pokemonId.toString()}
                />
            </Card>
        </Grid>
    )
}
