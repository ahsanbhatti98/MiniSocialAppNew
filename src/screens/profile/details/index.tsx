import {RouteProp, useRoute} from '@react-navigation/native';
import {Text} from '@src/components';
import {NavigationService} from '@src/config';
import {useTheme} from '@src/hooks';
import {FontSize, SD} from '@src/utils';
import React from 'react';
import {Pressable, ScrollView} from 'react-native';
import Animated, {FadeInLeft, LightSpeedInLeft} from 'react-native-reanimated';
import {DetailsRoutesTypes} from './details.types';

export const Details = () => {
  const {AppTheme} = useTheme();
  const route = useRoute<RouteProp<DetailsRoutesTypes, 'DetailsScreen'>>();
  const item = route?.params?.item;
  const {title, description, image} = item;

  return (
    <>
      <Animated.Image
        // sharedTransitionTag={item?.id?.toString()}
        // sharedTransitionStyle={sharedElementTransition}
        source={{uri: image}}
        style={{width: '100%', height: SD.hp(300)}}
      />
      <ScrollView>
        <Animated.Text
          style={{
            fontSize: FontSize.FontLarge,
            marginVertical: SD.hp(20),
            color: AppTheme.PrimaryTextColor,
          }}
          entering={FadeInLeft.duration(500).delay(300)}>
          {title}
        </Animated.Text>
        <Animated.Text
          style={{color: AppTheme.PrimaryTextColor}}
          entering={LightSpeedInLeft.duration(500).delay(500)}>
          {description}
        </Animated.Text>
        <Pressable
          style={{
            backgroundColor: AppTheme.Primary,
            width: '100%',
            height: SD.hp(50),
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: SD.hp(20),
          }}
          onPress={() => {
            NavigationService.goBack();
          }}>
          <Text bold size={24} color={AppTheme.Base}>
            Go Back
          </Text>
        </Pressable>
      </ScrollView>
    </>
  );
};
