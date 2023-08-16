import { Button, Text } from '@nextui-org/react'
import router from 'next/router'

const ALL_POKEMON_URL = '/pokemons'

interface ButtonProps {
    name: string
    url: string
}

const buttonStyle = {
    "display": "flex",
    "height": "8vh",
}

export const GenButton = ({ name, url }: ButtonProps) => {

    if (url === ALL_POKEMON_URL) {
        return (
            <Button css={buttonStyle}
                ghost onPress={() => router.push(ALL_POKEMON_URL)}
            >
                <Text h2 transform='uppercase' >{name}</Text>
            </Button>
        )
    }

    else {
        const pokemonGenerationURL = (`${url.split('/')['5']}/${url.split('/')['6']}`) // e.g. [/generation/1, /generation/2, ...]
        const handleClick = () => {
            router.push(`/${pokemonGenerationURL}`)
        }

        return (
            <Button
                css={buttonStyle}
                ghost onPress={handleClick} >
                <Text h2 transform='uppercase' >{name}</Text>
            </Button>
        )
    }
}

