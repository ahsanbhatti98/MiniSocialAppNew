import {MainContainer, PrimaryButton, Text} from '@components/index';
import React from 'react';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import {logout} from '../../../redux-store/reducers';
import {useFirebaseAuth} from '@src/hooks';

export const Setting = () => {
  const {logoutFirebase, loading} = useFirebaseAuth();
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
          isLoading={loading}
          disabled={loading}
        />
      </View>
    </MainContainer>
  );
};
