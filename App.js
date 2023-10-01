import React from 'react';
import MainApp from './src/navigation';
import { PersistGate } from 'redux-persist/integration/react';
import { MenuProvider } from 'react-native-popup-menu';
import {store,persistor } from './src/store/index';
import {Provider} from 'react-redux';
import {StatusBar} from 'react-native'
import { colors } from './src/constants/theme';
const App = () => {
    return (
        <Provider store={store}>
            <StatusBar backgroundColor={colors.dark_primary_color}  barStyle={"light-content"} />
            <PersistGate loading={null} persistor={persistor}>
                <MenuProvider>
                    <MainApp />
                </MenuProvider>
            </PersistGate>
        </Provider>
    );
};


export default App;
