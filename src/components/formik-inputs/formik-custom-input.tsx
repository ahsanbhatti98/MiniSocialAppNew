import Images from '@config/images';
import {useField} from 'formik';
import React, {FC, useState} from 'react';
import {
  Image,
  ImageProps,
  TextInput as RNTextInput,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {AppThemeColorsType, useTheme} from '../../hooks';
import {SD} from '../../utils';
import Text from '../text';

export type FormikCustomInputProps = TextInputProps & {
  customStyle?: TextInputProps['style'];
  containerStyle?: ViewStyle;
  onEyePress?: () => void;
  hidepswdState?: boolean;
  eye?: boolean;
  isIcon?: boolean;
  iconImage?: ImageProps['source'];
  onBtnPress?: () => void;
  isPressableIcon?: boolean;
  iconStyle?: ImageProps['style'];
  name: string; // Add the name prop here
  label?: string;
  mainContainerStyles?: ViewProps['style'];
};

export const FormikCustomInput: FC<FormikCustomInputProps> = ({
  customStyle,
  containerStyle,
  onEyePress,
  hidepswdState,
  eye,
  isIcon,
  iconImage,
  onBtnPress,
  isPressableIcon,
  iconStyle = {},
  name, // Destructure the name prop here
  label,
  mainContainerStyles,
  editable = true,
  ...props
}) => {
  const {AppTheme} = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [field, meta] = useField(name);

  return (
    <View style={mainContainerStyles}>
      <Text size={12} regular secondaryColor bottomSpacing={10}>
        {label}
      </Text>
      <View
        style={[
          styles(AppTheme).textContainer,
          isFocused && styles(AppTheme).focused,
          !editable && styles(AppTheme).disabled,
          containerStyle,
        ]}>
        {isIcon && (
          <TouchableOpacity
            activeOpacity={0.6}
            style={[
              styles(AppTheme).eyeStyle,
              styles(AppTheme).iconContainer,
              iconStyle,
            ]}
            onPress={() => isPressableIcon && onBtnPress && onBtnPress()}>
            <Image
              source={iconImage}
              style={styles(AppTheme).iconImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
        <RNTextInput
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            field.onBlur(name);
            setIsFocused(false);
          }}
          onChangeText={field.onChange(name)}
          value={field.value}
          selectionColor={AppTheme.Primary}
          style={[
            styles(AppTheme).textInput,
            !eye && {width: '100%'},
            customStyle,
          ]}
          placeholderTextColor={AppTheme.InActiveTabBar}
          editable={editable}
          {...props}
        />
        {eye && (
          <TouchableOpacity
            activeOpacity={0.6}
            style={[styles(AppTheme).eyeStyle, {alignItems: 'flex-end'}]}
            onPress={onEyePress}>
            <Image
              source={
                hidepswdState ? Images.EyeAbleIcon : Images.EyeDisableIcon
              }
              style={{
                width: '45%',
                height: '45%',
                tintColor: hidepswdState
                  ? AppTheme.Primary
                  : AppTheme.InActiveTabBar,
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
      {meta.touched && meta.error && (
        <Text
          size={10}
          // topSpacing={10}
          bottomSpacing={10}
          color={AppTheme.ErrorTextColor}>
          {meta.error}
        </Text>
      )}
    </View>
  );
};

const styles = (AppTheme: AppThemeColorsType) =>
  StyleSheet.create({
    textContainer: {
      borderRadius: SD.hp(10),
      height: SD.hp(51),
      width: '100%',
      flexDirection: 'row',
      marginBottom: SD.hp(10),
      backgroundColor: AppTheme.Base,
      alignItems: 'center',
      paddingLeft: SD.wp(6),
      borderWidth: 1,
      borderColor: AppTheme.DetailCardBorderColor,
      paddingRight: SD.wp(10),
    },
    textInput: {
      color: AppTheme.PrimaryTextColor,
      fontSize: SD.customFontSize(14),
      fontFamily: 'Fonts.Regular',
      height: '100%',
      width: '70%',
      paddingLeft: SD.wp(16),
    },
    eyeStyle: {
      width: '12%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    focused: {
      borderColor: AppTheme.Primary,
    },
    iconImage: {width: '80%', height: '80%'},
    disabled: {
      backgroundColor: AppTheme.HomeCardColorBlue,
    },
    iconContainer: {
      borderRightWidth: 1,
      borderColor: AppTheme.InputIconBorder,
      height: '50%',
    },
  });
