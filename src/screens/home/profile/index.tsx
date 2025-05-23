import {CustomTouchable} from '@src/components';
import {NavigationService} from '@src/config';
import {HomeRoutes} from '@src/constants';
import {SD} from '@src/utils';
import React from 'react';
import {Button, ScrollView, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {mockData} from './mock-data';

export const Profile = () => {
  const width = useSharedValue(120);
  const height = useSharedValue(120);

  const startAnimation = () => {
    const randomWidth = Math.floor(Math.random() * 300) + 100;
    const randomHeight = Math.floor(Math.random() * 300) + 100;
    width.value = withSpring(randomWidth);
    height.value = withSpring(randomHeight);
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: width.value,
      height: height.value,
      backgroundColor: 'red',
    };
  });

  return (
    <ScrollView>
      <Button title="Animate" onPress={startAnimation} />

      <Animated.View style={[animatedStyles, {marginTop: SD.hp(50)}]} />

      {/* <Button
        title="Go to Details"
        onPress={() =>
          NavigationService.navigate('App', {
            screen: HomeRoutes['Details'],
          })
        }
      /> */}

      {mockData?.map(item => (
        <View key={item?.id} style={{padding: SD.hp(10)}}>
          <CustomTouchable
            // style={{borderWidth: 1}}
            onPress={() => {
              NavigationService.navigate('App', {
                screen: HomeRoutes.Details,
                params: {item},
              });
            }}>
            <Animated.Image
              // sharedTransitionTag={item?.id?.toString()}
              // sharedTransitionStyle={sharedElementTransition}
              source={{uri: item?.image}}
              resizeMode="cover"
              style={{width: SD.wp(100), height: SD.hp(100)}}
            />
          </CustomTouchable>
        </View>
      ))}
    </ScrollView>
  );
};

// const styles = StyleSheet.create({});

// import { StackScreenProps } from '@react-navigation/stack';
// import { AppStackParamList } from '@navigation/types/navigation.types';

// type Props = StackScreenProps<AppStackParamList, 'Profile'>;

// const ProfileScreen: React.FC<Props> = ({ navigation, route }) => {
//   const { userId } = route.params;
//   ...
// };
