import React, {FC, Ref, useState} from 'react';
import {
  Image,
  ImageProps,
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {useTheme} from '../../hooks';
import {Fonts} from '../../styles';
import {SD} from '../../utils';
import Text from '../text';
import Images from '@config/images';

export type CustomInputProps = TextInputProps & {
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
  error?: string;
  touched?: boolean;
  inputRef?: Ref<TextInput>;
  onBlur?: () => void;
  focusBorderColor?: string;
  isSecondary?: boolean;
};

export const CustomInput: FC<CustomInputProps> = ({
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
  error,
  touched,
  inputRef,
  onBlur,
  focusBorderColor,
  isSecondary,
  ...rest
}) => {
  const {AppTheme} = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  return (
    <>
      <View
        style={[
          styles.textContainer(AppTheme, isSecondary),
          isFocused && {
            borderColor:
              focusBorderColor || AppTheme.TextInputBorderColorFocused,
          },

          containerStyle,
        ]}>
        {isIcon && (
          <TouchableOpacity
            activeOpacity={0.6}
            style={[styles.eyeStyle(AppTheme), styles.eyeStyle2, iconStyle]}
            onPress={() => isPressableIcon && onBtnPress && onBtnPress()}>
            <Image
              source={iconImage}
              style={styles.iconSizeStyle}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
        <TextInput
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            if (onBlur) {
              onBlur();
            }
            setIsFocused(false);
          }}
          selectionColor={AppTheme.Primary}
          style={[
            styles.textInput(AppTheme),
            !eye && {
              width: '85%',
            },
            customStyle,
          ]}
          placeholderTextColor={AppTheme.InActiveTabBar}
          ref={inputRef}
          {...rest}
        />
        {eye && (
          <TouchableOpacity
            activeOpacity={0.6}
            style={[styles.eyeStyle, styles.alignItems]}
            onPress={onEyePress}>
            {hidepswdState ? (
              <Image
                source={Images.EyeAbleIcon}
                style={styles.eyeIconActive(AppTheme)}
                resizeMode="contain"
              />
            ) : (
              <Image
                source={Images.EyeDisableIcon}
                style={styles.eyeIconInActive(AppTheme)}
                resizeMode="contain"
              />
            )}
          </TouchableOpacity>
        )}
      </View>

      {touched && error && <Text color={AppTheme.ErrorTextColor}>{error}</Text>}
    </>
  );
};

const styles = StyleSheet.create<any>({
  textContainer: (AppTheme: any, isSecondary: boolean) => ({
    // borderWidth: 1,
    borderRadius: SD.hp(10),
    height: SD.hp(51),
    width: '100%',
    flexDirection: 'row',
    // justifyContent: 'space-between',
    marginVertical: SD.hp(10),
    backgroundColor: isSecondary
      ? AppTheme.TextInputSecondaryBaseColor
      : AppTheme.TextInputBaseColor,
    // borderColor: isSecondary
    //   ? AppTheme.TextInputSecondaryBorderColor
    //   : AppTheme.TextInputBorderColor,
    alignItems: 'center',
    paddingLeft: SD.wp(10),
    paddingRight: SD.wp(10),
    borderColor: 'red',
    // borderWidth: 1,
    // marginHorizontal:SD.hp(10),
  }),
  textInput: (AppTheme: any) => ({
    color: AppTheme.PrimaryTextColor,
    fontSize: SD.customFontSize(14),
    fontFamily: Fonts.Regular,
    height: '100%',
    width: '85%',
    paddingLeft: SD.wp(16),
    // borderWidth: 1,
  }),

  eyeStyle: {
    width: '12%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alignItems: {
    alignItems: 'center',
    // borderWidth: 1,
  },
  eyeIconActive: (AppTheme: any) => ({
    width: '45%',
    height: '45%',
    // tintColor: AppTheme.InActiveTabBar,
    tintColor: AppTheme.Primary,
  }),
  eyeIconInActive: (AppTheme: any) => ({
    width: '45%',
    height: '45%',
    tintColor: AppTheme.InActiveTabBar,
  }),
  eyeStyle2: (AppTheme: any) => ({
    borderRightWidth: 1,
    borderColor: AppTheme.InputIconBorder,
    height: '50%',
  }),
  iconSizeStyle: {
    width: '80%',
    height: '80%',
    // borderWidth:1
  },
});
