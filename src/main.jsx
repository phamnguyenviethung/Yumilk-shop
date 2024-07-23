import '@fontsource/be-vietnam-pro/300.css';
import '@fontsource/be-vietnam-pro/400.css';
import '@fontsource/be-vietnam-pro/500.css';
import '@fontsource/be-vietnam-pro/600.css';
import '@fontsource/be-vietnam-pro/700.css';
import '@fontsource/be-vietnam-pro/800.css';
import '@fontsource/paytone-one';
import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, useLocation } from 'react-router-dom';
import App from './App.jsx';
import theme from './configs/theme.js';
import { Provider } from 'react-redux';
import store from './configs/store.js';

const HubSpotScript = () => {
  const location = useLocation();

  React.useEffect(() => {
    const scriptId = 'hs-script-loader'; // Create script id
    const existingScript = document.getElementById(scriptId); // Check if script is already loaded

    if (location.pathname !== '/login' && !existingScript) {
      const script = document.createElement('script'); // Create script
      script.type = 'text/javascript';
      script.id = scriptId;
      script.async = true;
      script.defer = true;
      script.src = 'https://js.hs-scripts.com/46752129.js';
      document.body.appendChild(script);

      console.log('HubSpot script added');
    } else if (location.pathname === '/login' && existingScript) { // Remove script if on login page
      document.body.removeChild(existingScript);
      console.log('HubSpot script removed');
    }

    return () => {
      if (existingScript) { // Clean up script on unmount
        document.body.removeChild(existingScript);
        console.log('HubSpot script cleaned up');
      }
    };
  }, [location.pathname]);

  return null; // Return null as this component doesn't render anything
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <HubSpotScript />
          <App />
        </BrowserRouter>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
