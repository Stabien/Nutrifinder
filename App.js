import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import store from './redux/store/store.js';
import ItemDetail from './containers/ItemDetail.js';
import Home from './containers/Home.js';
import Filters from './containers/Filters.js';

const Stack = createStackNavigator();

export default App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Nutrifinder'>
          <Stack.Screen
            name='Nutrifinder'
            component={Home}
            options={{
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: 'white',
                elevation: 0,
                shadowRadius: 0,
                shadowOffset: {
                  height: 0,
                }
              }
            }}
          />
          <Stack.Screen
            name='Filters'
            component={Filters}
            options={{
              title: 'Filtres',
              headerBackTitle: 'Retour'
            }}
          />
          <Stack.Screen
            name='ItemDetail'
            component={ItemDetail}
            options={({ route }) => ({
              title: route.params.name,
              headerBackTitle: 'Retour',
              headerTitleContainerStyle: {
                width: '50%'
              }
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
