import React from 'react';
// import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {RootStackParamList} from '@src/types';
import {useTypedSelector} from '@src/hooks';
import {AppStack, AuthStack} from './stacks';
import {navigationRef} from '@src/config/navigationService';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const isAuthenticated = useTypedSelector(state => state.auth.isAuthenticated);

  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
          // ...TransitionPresets.DefaultTransition,
          // ...TransitionPresets.SlideFromRightIOS,
        }}>
        {isAuthenticated ? (
          <RootStack.Screen name="App" component={AppStack} />
        ) : (
          <RootStack.Screen name="Auth" component={AuthStack} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export {RootNavigator};
