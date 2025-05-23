// components/Dropdown.js
import {useField} from 'formik';
import React, {useState} from 'react';
import {FlatList, StyleSheet, View, ViewProps} from 'react-native';
import {AppThemeColorsType, useTheme} from '../../hooks';
import {SD} from '../../utils';
import {CustomTouchable} from '../custom-touchable';
import {EmptyState} from '../empty-state';
import {Modal} from '../modal';
import Text from '../text';

export type DropdownItemPropsBase = {
  id: number;
  label: string;
};

export type DropdownItemProps<T = {}> = DropdownItemPropsBase & T;

type FormikDropdownProps<T = {}> = {
  data: DropdownItemProps<T>[];
  placeholder: string;
  name: string;
  label: string;
  onValueChange?: (value: DropdownItemProps<any>) => void;
  disabled?: boolean;
  mainContainerStyles?: ViewProps['style'];
};

export const FormikDropdown: React.FC<FormikDropdownProps> = ({
  data,
  placeholder,
  name,
  label,
  onValueChange,
  disabled = false,
  mainContainerStyles,
}) => {
  const {AppTheme} = useTheme();
  const [field, meta, helpers] = useField<{label: string; id: string | number}>(
    name,
  );
  const [isModalVisible, setModalVisible] = useState(false);

  const handleSelect = (item: DropdownItemProps) => {
    helpers.setValue({label: item.label, id: item.id}); // Set only the label as the value
    onValueChange && onValueChange(item);
    setModalVisible(false);
  };

  return (
    <View style={[styles.container, mainContainerStyles]}>
      <Text size={12} regular secondaryColor bottomSpacing={10}>
        {label}
      </Text>
      <CustomTouchable
        disabled={disabled}
        style={[
          styles.dropdown,
          stylesWithColor(AppTheme).dropDownStyles,
          disabled && {
            backgroundColor: AppTheme.HomeCardColorBlue,
          },
        ]}
        onPress={() => setModalVisible(true)}>
        <Text size={14}>{field.value?.label || placeholder}</Text>
        {/* <CustomImage
          source={Images.RightArrow}
          style={{
            width: SD.hp(16),
            height: SD.hp(16),
            transform: [{rotate: '90deg'}],
          }}
        /> */}
      </CustomTouchable>

      <Modal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        mainContainerStyle={styles.mainContainerStyle}
        modalStyles={styles.modalStyles}>
        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
          style={styles.listStyle}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <EmptyState customStyle={{marginTop: SD.hp(0)}} />
          }
          renderItem={({item}) => (
            <CustomTouchable
              style={[styles.item, stylesWithColor(AppTheme).borderStyle]}
              onPress={() => handleSelect(item)}>
              <Text medium color={AppTheme.Primary}>
                {item.label}
              </Text>
            </CustomTouchable>
          )}
        />
      </Modal>

      {meta.touched && meta.error && (
        <Text size={10} topSpacing={10} color={AppTheme.ErrorTextColor}>
          {meta.error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: SD.hp(10),
    borderRadius: SD.hp(10),
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: SD.hp(50),
    borderRadius: SD.hp(10),
    paddingHorizontal: SD.hp(20),
    width: '100%',
  },
  item: {
    padding: SD.hp(8),
    width: '100%',
    borderBottomWidth: 1,
  },
  mainContainerStyle: {
    justifyContent: 'flex-end',
  },
  listStyle: {width: '100%', height: '100%'},
  modalStyles: {
    height: '50%',
    // height: data?.length > 5 ? '50%' : '20%',
    width: '97%',
    margin: 0,
  },
});

const stylesWithColor = (AppTheme: AppThemeColorsType) =>
  StyleSheet.create({
    dropDownStyles: {
      backgroundColor: AppTheme.Base,
      borderColor: AppTheme.DetailCardBorderColor,
      borderWidth: 1,
    },
    borderStyle: {borderColor: AppTheme.InActiveTabBar},
  });
