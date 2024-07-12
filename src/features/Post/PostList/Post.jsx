import {
    Box,
    Center,
    Flex,
    HStack,
    Heading,
    Icon,
    Image,
    Tag,
    Text,
    VStack,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Post = ({ data }) => {
    return (
        <Flex
            to={`/posts/${data.id}`}
            as={Link}
            direction='column'
            minH='300px'
            userSelect='none'
            border='0.3px solid'
            borderColor='gray.200'
            p={1}
            _hover={{
                bgColor: 'gray.100',
            }}
            borderRadius='10'
        >
            <Center flex='1' boxSize='full' pos='relative'>
                <Image
                    boxSize='full'
                    alt={data.name}
                    src={data.thumbnail}
                    fallbackSrc='https://placehold.co/200x200'
                    objectFit='none'
                />
            </Center>
            <Flex w direction='column' flex='1' justifyContent='space-between'>
                <Box
                    flex='1'
                    fontSize={{
                        base: '0.85rem',
                        lg: '0.9rem',
                    }}
                    textAlign='left'
                >
                    <Text
                        sx={{
                            WebkitLineClamp: '2',
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            display: '-webkit-box',
                        }}
                        style={{ fontWeight: '600' }}
                    >
                        {' '}
                        {data.title}
                    </Text>
                </Box>
            </Flex>
        </Flex>
    )
}

export default Post