import { MainContainer, PrimaryButton, Text } from '@components/index';
import { logoutFirebase } from '@src/api/firebase';
import React from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux-store/reducers';

export const Setting = () => {
  // const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <MainContainer>
      <Text bold size={24}>
        Setting
      </Text>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
        <PrimaryButton
          onPress={async () => {
            logoutFirebase();
            dispatch(logout());
          }}
          title="Logout"
        />
      </View>
    </MainContainer>
  );
};
