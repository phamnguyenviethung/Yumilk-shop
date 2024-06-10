import { extendTheme } from '@chakra-ui/react';

// 2. Call `extendTheme` and pass your custom values
const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};
const theme = extendTheme({
  fonts: {
    heading: `'Be Vietnam Pro', sans-serif`,
    body: `'Be Vietnam Pro', sans-serif`,
  },
  config,
});

export default theme;
