import React from 'react';
import AppNavigator from './routes';
import AppContextProvider from './Store';

const App = () => {
    return (
        <AppContextProvider>
            <AppNavigator />
        </AppContextProvider>
    );
};
export default App;
