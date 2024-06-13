import { useAutocompleteProductQuery } from '@/apis/productApi';
import { Box, List, ListItem } from '@chakra-ui/react';
import React from 'react';

const SearchHint = ({ keyword }) => {
    // if keyword is fewer than 3 letters, don't return
    if (keyword.length < 3) return null;

    const { data: autocompleteData, error, isLoading } = useAutocompleteProductQuery({ keyword });

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const items = autocompleteData?.items;

    return (

        <List >
            {items?.slice(0, 5).map((item, index) => (
                <ListItem key={index}>{item.name}</ListItem>
            ))}
        </List>
    );
};

export default SearchHint;