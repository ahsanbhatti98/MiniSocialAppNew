import {
  CustomInput,
  CustomTouchable,
  MainContainer,
  PrimaryButton,
  Text,
} from '@components/index';
import {Formik} from 'formik';
import React, {useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {TextInput, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {NavigationService} from '../../../config';
import {AuthRoutes} from '../../../constants';
import {AuthSchema} from '../../../formik-schemas';
import {SD} from '../../../utils';
import {useFirebaseAuth} from '@src/hooks';
export const Login = () => {
  const {loginFirebase, loading} = useFirebaseAuth();
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const initailState = {
    email: '',
    password: '',
  };

  const [hidePassword, setHidePassword] = useState(true);

  const passwordRef = useRef<TextInput>(null!);

  return (
    <Formik
      initialValues={initailState}
      onSubmit={async values => {
        loginFirebase(values.email, values.password);
      }}
      validationSchema={AuthSchema.LoginSchema}>
      {({
        values,
        errors,
        touched,
        handleChange,
        setFieldTouched,
        isValid,
        handleSubmit,
      }) => (
        <MainContainer>
          <View style={{flex: 1}}>
            <CustomInput
              placeholder="Email Address"
              value={values?.email}
              onChangeText={handleChange('email')}
              onBlur={() => setFieldTouched('email')}
              error={errors?.email}
              touched={touched?.email}
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current.focus()}
            />
            <CustomInput
              placeholder="Password"
              value={values?.password}
              onChangeText={handleChange('password')}
              onBlur={() => setFieldTouched('password')}
              error={errors?.password}
              touched={touched?.password}
              secureTextEntry={hidePassword}
              hidepswdState={hidePassword}
              eye
              onEyePress={() => {
                if (values?.password) {
                  setHidePassword(prev => !prev);
                }
              }}
              returnKeyType="done"
              inputRef={passwordRef}
            />
            <PrimaryButton
              title={t('login')}
              onPress={() => handleSubmit()}
              customStyles={{
                marginTop: SD.hp(20),
              }}
              isLoading={loading}
              disabled={loading}
            />
          </View>

          <CustomTouchable
            style={{marginBottom: SD.hp(20)}}
            onPress={() => {
              NavigationService.navigate('Auth', {
                screen: AuthRoutes.SignUp,
              });
            }}>
            <Text bold centered primartColor>
              {"Don't have an account? Sign Up"}
            </Text>
          </CustomTouchable>
        </MainContainer>
      )}
    </Formik>
  );
};
