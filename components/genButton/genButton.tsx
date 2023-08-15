import { Button, Text } from '@nextui-org/react'
import router from 'next/router'


interface ButtonProps {
    name: string
    url: string
}

export const GenButton = ({ name, url }: ButtonProps) => {

    if (url === '/pokemons') {
        return (
            <Button css={{
                "display": "flex",
                "height": "8vh",
            }}
                ghost onPress={() => router.push('/pokemons')}
            >
                <Text h2 transform='uppercase' >{name}</Text>
            </Button>
        )
    }

    else {
        const genUrl = (`${url.split('/')['5']}/${url.split('/')['6']}`)
        const handleClick = () => {
            router.push(`/${genUrl}`)
        }

        return (
            <Button
                css={{
                    "display": "flex",
                    "height": "8vh",
                }}
                ghost onPress={handleClick} >
                <Text h2 transform='uppercase' >{name}</Text>
            </Button>
        )
    }
}

