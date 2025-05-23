import {Images} from '@src/config';
import {AppThemeColorsType, useTheme} from '@src/hooks';
import {SD} from '@src/utils';
import React from 'react';
import {ImageProps, StyleSheet} from 'react-native';
import {CustomImage} from '../custom-image';
import {CustomTouchable} from '../custom-touchable';

type FloatingBtnProps = {
  onPress?: () => void;
  icon?: ImageProps['source'];
  iconSize?: number;
};

export const FloatingBtn: React.FC<FloatingBtnProps> = ({
  onPress,
  icon = Images.AddIcon,
  iconSize = 60,
}) => {
  const {AppTheme} = useTheme();
  return (
    <CustomTouchable onPress={onPress} style={styles(AppTheme).floatingBtn}>
      <CustomImage
        source={icon}
        style={{width: SD.hp(iconSize), height: SD.hp(iconSize)}}
      />
    </CustomTouchable>
  );
};

const styles = (AppTheme: AppThemeColorsType) =>
  StyleSheet.create({
    floatingBtn: {
      position: 'absolute',
      bottom: 45,
      right: 45,
      borderRadius: SD.hp(50),
      backgroundColor: AppTheme.Primary,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5,
    },
  });
