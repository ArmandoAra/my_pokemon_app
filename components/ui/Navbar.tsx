import NextLink from 'next/link';
import { Link, Spacer, Text, useTheme, Image } from '@nextui-org/react';

export const Navbar = () => {
    const { theme } = useTheme()

    return (
        <div style={
            {
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                padding: '0 20px',
                backgroundColor: theme?.colors.gray100.value,
                height: '100px'
            }
        }>
            <Link as={NextLink} href='/' style={
                {
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    textDecoration: 'none',
                }
            }>

                <Image
                    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
                    width={100}
                    height={100}
                    alt='Pokemon Logo'
                />

                <Text color='white' h2>P</Text>
                <Text color='white' h3>okémon</Text>

                <Spacer css={{ 'flex': 1 }} />
            </Link>
            <NextLink href='/favoritos'>
                <Text color='white' h3>Favoritos</Text>
            </NextLink>

        </div >
    )
}


