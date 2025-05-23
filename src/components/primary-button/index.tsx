import React, {FC} from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import {AppThemeColorsType, useTheme} from '@hooks/index';
import {SD} from '../../utils';
import Text from '../text';

export type PrimaryButtonProps = TouchableOpacityProps & {
  title: string;
  isLoading?: boolean;
  disabled?: boolean;
  color?: string;
  textColor?: string;
  customStyles?: StyleProp<ViewStyle>;
  fontSize?: number;
  isSecondary?: boolean;
};

export const PrimaryButton: FC<PrimaryButtonProps> = ({
  title,
  onPress,
  isLoading,
  disabled,
  color,
  textColor = '#ffffff',
  customStyles,
  fontSize = 16,
  isSecondary = false,
  ...rest
}) => {
  const {AppTheme} = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        styles(AppTheme).buttonContainer,
        {
          backgroundColor: color || AppTheme.Primary,
        },
        isSecondary && styles(AppTheme).buttonSecondary,
        disabled && {
          backgroundColor: AppTheme.InActiveTabBar,
        },
        customStyles,
      ]}
      disabled={disabled || isLoading}
      {...rest}>
      {isLoading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text
          semiBold
          size={fontSize}
          color={isSecondary ? AppTheme.Primary : textColor}>
          {title}
        </Text>
        // <Text style={{ color: textColor }}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = (AppTheme: AppThemeColorsType) =>
  StyleSheet.create({
    buttonContainer: {
      height: SD.hp(51),
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: SD.hp(10),
      borderRadius: SD.hp(10),
      paddingHorizontal: SD.hp(20),

      // ...Metrix.createShadow(),
    },

    buttonSecondary: {
      borderWidth: 1,
      borderColor: AppTheme.Primary,
      backgroundColor: AppTheme.Transparent,
    },
  });
