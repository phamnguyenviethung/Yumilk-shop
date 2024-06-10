import React, { useState } from 'react'
import { Card, CardHeader, CardBody, CardFooter, Flex, Avatar, Box, Stack, Text } from '@chakra-ui/react'

function Feedback() {
    return (
        <Card>
            <CardBody>
                <Flex>
                    <Avatar />
                    <Box marginLeft={'13px'}>
                        <Stack direction={'column'}>
                            <h3>John Doe</h3>
                            <Stack direction={'row'}>
                                <p>5 stars</p><p>2 days ago</p>
                            </Stack>
                            <Text>
                                This is a great product. I would recommend it to anyone.
                            </Text>
                        </Stack>
                    </Box>
                </Flex>
            </CardBody>
        </Card >
    )
}

export default Feedback