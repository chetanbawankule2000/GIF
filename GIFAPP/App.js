import {View, Text} from 'react-native';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import SearchResult from './screens/SearchResult';
import GifDetail from './screens/GifDetail';

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
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
  );
};

/* <HomeScreen />; */

export default App;
