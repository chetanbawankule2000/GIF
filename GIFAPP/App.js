import {View, Text} from 'react-native';
import React from 'react';
import {Provider} from 'react-redux';
import {store} from './redux/store';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import SearchResult from './screens/SearchResult';
import GifDetail from './screens/GifDetail';

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{tabBarShowLabel: false}}>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SearchedResult"
            component={SearchResult}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="GifDetails"
            component={GifDetail}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
