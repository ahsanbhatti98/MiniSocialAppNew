import {useField} from 'formik';
import React, {FC, useState} from 'react';
import {ImageProps, StyleSheet, View, ViewProps} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {AppThemeColorsType, useTheme} from '../../hooks';
import {DateUtils, SD} from '../../utils';
import {CustomImage} from '../custom-image';
import {CustomTouchable} from '../custom-touchable';
import Text from '../text';

export type FormikCustomDatePickerProps = {
  customStyle?: ViewProps['style'];
  icon?: ImageProps['source'];
  customIconStyle?: ImageProps['style'];
  isIcon?: boolean;
  placeholder?: string;
  isSecondary?: boolean;
  name: string;
  label: string;
  mode?: 'date' | 'time' | 'datetime';
  is24hour?: boolean;
  mainContainerStyles?: ViewProps['style'];
  disabled?: boolean;
};

export const FormikCustomDatePicker: FC<FormikCustomDatePickerProps> = ({
  customStyle,
  icon,
  customIconStyle,
  isIcon,
  placeholder = 'Select Date',
  name,
  label,
  mode = 'date',
  is24hour = false,
  mainContainerStyles,
  disabled = false,
}) => {
  const {AppTheme} = useTheme();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [field, meta, helpers] = useField(name);

  return (
    <View style={mainContainerStyles}>
      <Text size={12} regular secondaryColor topSpacing={10}>
        {label}
      </Text>
      <CustomTouchable
        onPress={() => setShowDatePicker(true)}
        style={[
          styles(AppTheme).dateContainer,
          disabled && {
            backgroundColor: AppTheme.HomeCardColorBlue,
          },
          customStyle,
        ]}
        disabled={disabled}>
        {isIcon && (
          <View
            style={[
              styles(AppTheme).iconContainer,
              // {borderWidth: 1},
            ]}>
            <CustomImage
              source={icon}
              style={[
                {width: '90%', height: '90%', marginRight: SD.wp(5)},
                customIconStyle,
              ]}
            />
          </View>
        )}
        <View style={{width: '85%'}}>
          {field.value ? (
            <Text regular size={13} style={{width: '100%'}}>
              {DateUtils.getDateTimeFormat(
                field.value,
                is24hour
                  ? DateUtils.apiDateTimeFormat['Hours24']
                  : mode == 'time'
                  ? DateUtils.apiDateTimeFormat['HoursTime']
                  : mode == 'datetime'
                  ? DateUtils.apiDateTimeFormat['DateTimeApiBody']
                  : DateUtils.apiDateTimeFormat['ClientDate'],
              )}
            </Text>
          ) : (
            <Text
              color={AppTheme.InActiveTabBar}
              style={{width: '100%'}}
              regular
              size={13}>
              {placeholder}
            </Text>
          )}
        </View>
      </CustomTouchable>

      <DatePicker
        modal
        open={showDatePicker}
        theme="light"
        date={field.value || new Date()}
        mode={mode}
        onConfirm={date => {
          helpers.setValue(date);
          setShowDatePicker(false);
        }}
        onCancel={() => setShowDatePicker(false)}
      />

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
    dateContainer: {
      borderWidth: 1,
      borderRadius: SD.hp(10),
      height: SD.hp(51),
      width: '100%',
      flexDirection: 'row',
      // justifyContent: 'space-between',
      marginVertical: SD.hp(10),
      backgroundColor: AppTheme.Base,
      borderColor: AppTheme.DetailCardBorderColor,
      alignItems: 'center',
      paddingHorizontal: SD.wp(10),
    },
    iconContainer: {
      // width: '15%',
      width: SD.wp(35),
      height: '40%',
      alignItems: 'center',
      justifyContent: 'center',
      borderRightWidth: 1.5,
      borderColor: AppTheme.InputIconBorder,
      marginRight: SD.wp(10),
      // paddingRight: SD.wp(5),
    },
  });
