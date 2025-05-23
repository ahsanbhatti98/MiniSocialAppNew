import React, {FC, useState} from 'react';
import {ImageProps, StyleSheet, View, ViewProps} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {useTheme} from '../../hooks';
import {SD} from '../../utils';
import {CustomImage} from '../custom-image';
import {CustomTouchable} from '../custom-touchable';
import Text from '../text';

export type CustomDatePickerProps = {
  customStyle?: ViewProps['style'];
  icon?: ImageProps['source'];
  isIcon?: boolean;
  onIconPress?: () => void;
  error?: string;
  touched?: boolean;
  date?: any;
  formatedData?: string;
  onDateChange: (date: Date | undefined) => void;
  placeholder?: string;
  isSecondary?: boolean;
};

export const CustomDatePicker: FC<CustomDatePickerProps> = ({
  customStyle,
  icon,
  isIcon,
  error,
  touched,
  date,
  onDateChange,
  placeholder = 'Select Date',
  isSecondary,
  formatedData,
}) => {
  const {AppTheme} = useTheme();
  const [showDatePicker, setShowDatePicker] = useState(false);

  //   const handleDateChange = (event: any, selectedDate: Date | undefined) => {
  //     setShowDatePicker(false);
  //     if (selectedDate) {
  //       onDateChange && onDateChange(selectedDate);
  //     }
  //   };

  return (
    <>
      <View style={[styles.dateContainer(AppTheme, isSecondary), customStyle]}>
        {date ? (
          <Text regular size={14}>
            {/* {DateUtils.getDateTimeFormat(date)} */}
            {formatedData}
          </Text>
        ) : (
          <Text color={AppTheme.InActiveTabBar} regular size={14}>
            {placeholder}
          </Text>
        )}
        {isIcon && (
          <CustomTouchable
            style={styles.iconContainer}
            onPress={() => setShowDatePicker(true)}>
            <CustomImage source={icon} style={styles.icon} />
          </CustomTouchable>
        )}
      </View>

      <DatePicker
        modal
        open={showDatePicker}
        theme="dark"
        date={new Date() || date}
        mode="date"
        onConfirm={date => {
          onDateChange(date);
          setShowDatePicker(false);
        }}
        onCancel={() => {
          setShowDatePicker(false);
        }}
      />

      {touched && error && <Text color={AppTheme.ErrorTextColor}>{error}</Text>}
    </>
  );
};

const styles = StyleSheet.create<any>({
  dateContainer: (AppTheme: any, isSecondary: boolean) => ({
    borderWidth: 1,
    borderRadius: SD.hp(10),
    height: SD.hp(51),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: SD.hp(10),
    backgroundColor: isSecondary
      ? AppTheme.TextInputSecondaryBaseColor
      : AppTheme.TextInputBaseColor,
    borderColor: AppTheme.TextInputBorderColor,
    alignItems: 'center',
    paddingLeft: SD.wp(20),
    paddingRight: SD.wp(10),
  }),
  iconContainer: {
    width: '12%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth:1
  },
  icon: {
    width: '45%',
    height: '45%',
  },
});
