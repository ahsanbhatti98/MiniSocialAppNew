import React from 'react';
// import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTheme} from '@src/hooks';
import {
  Chat,
  Details,
  Home,
  // Profile
} from '@src/screens/index';
import {AppStackParamList} from '@src/types';

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack = () => {
  const {AppTheme} = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: AppTheme.Primary,
        },
        // headerShown: false,
        headerTintColor: '#fff',
        headerTitleAlign: 'center', // Center the header title
        headerShadowVisible: true,
        // ...TransitionPresets.DefaultTransition,
        // ...TransitionPresets.SlideFromRightIOS,
      }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen name="Profile" component={Profile} /> */}
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="Chat" component={Chat} />
      {/* Add more screens here */}
    </Stack.Navigator>
  );
};

export {AppStack};
