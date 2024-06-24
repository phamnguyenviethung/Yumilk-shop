import React, { useState } from 'react'
import { Card, CardHeader, CardBody, CardFooter, Flex, Avatar, Box, Stack, Text } from '@chakra-ui/react'

function Feedback({ feedback }) {
    // Convert the date string to a Date object
    const date = new Date(feedback?.createdAt);

    // Format the date
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    console.log(feedback?.createdAt)

    return (
        <Card>
            <CardBody>
                <Flex>
                    <Avatar />
                    <Box marginLeft={'13px'}>
                        <Stack direction={'column'}>
                            <h3>{feedback?.id}</h3>
                            <Stack direction={'row'}>
                                <p>{feedback?.rating} stars</p><p>{formattedDate}</p>
                            </Stack>
                            <Text>
                                {feedback?.review}
                            </Text>
                        </Stack>
                    </Box>
                </Flex>
            </CardBody>
        </Card >
    )
}

export default Feedback