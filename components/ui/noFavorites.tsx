import { Container, Text, Image } from "@nextui-org/react"


export const NoFavorites = () => {
    return (
        <Container
            css={
                {
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 'calc(100vh - 100px)',
                    alignSelf: 'center',
                }
            }
        >
            <Text h1>Favorites</Text>
            <Image
                src='/no-image.png'
                width={250}
                height={250}
                alt='no-image'
            />
        </Container>
    )
}
