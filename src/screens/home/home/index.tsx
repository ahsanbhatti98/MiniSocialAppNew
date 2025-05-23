import React from 'react';
import {CustomTabBar} from '@components/custom-tab-bar';
import Images from '@config/images';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Profile} from '../profile';
import {Sessions} from '../sessions';
import {Setting} from '../setting';

const Tab = createBottomTabNavigator();
export const Home = () => {
  const tabIcons = {
    Profile: Images.EyeAbleIcon,
    Session: Images.EyeAbleIcon,
    Setting: Images.EyeDisableIcon,
  };
  return (
    <Tab.Navigator
      screenOptions={{
        // headerTintColor: '#fff',
        headerTitleAlign: 'center', // Center the header title
        headerShadowVisible: true,
      }}
      tabBar={props => <CustomTabBar {...props} icons={tabIcons} />}>
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Session" component={Sessions} />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{tabBarLabel: 'Setting'}}
      />
    </Tab.Navigator>
  );
};
