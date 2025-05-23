import React from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';
import {useTheme} from '../../hooks';
import {SD} from '../../utils';
import {CustomTouchable} from '../custom-touchable';
import Text from '../text';

type CheckboxProps = {
  checked?: boolean;
  onPress?: () => void;
  customStyle?: ViewProps['style'];
};

export const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  onPress = () => {},
  customStyle,
}) => {
  const {AppTheme} = useTheme();

  return (
    <CustomTouchable
      onPress={onPress}
      style={[
        styles.checkBoxContainer(AppTheme),
        checked && styles.isCheckedStyles(AppTheme),
        customStyle,
      ]}
      // hitSlop={10}
    >
      <View style={styles.flex}>
        <Text regular size={10} centered color={AppTheme.CheckColor}>
          {checked ? '✓' : ''}
        </Text>
      </View>
    </CustomTouchable>
  );
};

const styles = StyleSheet.create<any>({
  checkBoxContainer: (AppTheme: any) => ({
    borderWidth: 1,
    borderColor: AppTheme.DetailCardBorderColor,
    borderRadius: SD.hp(3),
    marginRight: SD.hp(10),
    backgroundColor: AppTheme.CheckBoxBackgroundColor,
    width: SD.wp(16),
    height: SD.hp(16),
    justifyContent: 'center',
    alignItems: 'center',
    // marginLeft: SD.hp(20),
  }),
  isCheckedStyles: (AppTheme: any) => ({
    backgroundColor: AppTheme.Primary,
  }),
  flex: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
