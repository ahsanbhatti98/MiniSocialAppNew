import {MainContainer, PrimaryButton, Text} from '@components/index';
import React from 'react';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import {setAuthentication} from '../../../redux-store/reducers';
import {TokenService} from '@src/utils';

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
            await TokenService.clearTokens();
            dispatch(setAuthentication(false));
          }}
          title="Logout"
        />
      </View>
    </MainContainer>
  );
};
