import {
  CustomInput,
  CustomTouchable,
  MainContainer,
  PrimaryButton,
  SvgIcon,
  Text,
} from '@components/index';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import {toggleTheme} from '@reduxStore/reducers';
import {Formik} from 'formik';
import React, {useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Button, TextInput, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {NavigationService} from '../../../config';
import {AuthRoutes} from '../../../constants';
import {AuthSchema} from '../../../formik-schemas';
import {LanguageCode, useLanguage, useTheme} from '../../../hooks';
import {useLogin} from '../../../hooks/api';
import {SD} from '../../../utils';
// import Eye from '@icons/eye.png';
export const Login = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const {changeLanguage, currentLanguage} = useLanguage();
  const {AppTheme, isDarkTheme} = useTheme();

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  const initailState = {
    email: '',
    password: '',
  };

  const [hidePassword, setHidePassword] = useState(true);

  const passwordRef = useRef<TextInput>(null!);
  const {mutate: loginFunc, isPending} = useLogin();

  const SignInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      console.log('userData-><>>>>>>>', userInfo);
      // return
    } catch (error) {
      console.log('errr---<>>>>', error);
      // if (error?.code === statusCodes.SIGN_IN_CANCELLED) {
      //   // user cancelled the login flow
      // } else if (error?.code === statusCodes.IN_PROGRESS) {
      //   // operation (e.g. sign in) is in progress already
      // } else if (error?.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      //   // play services not available or outdated
      // } else {
      //   // some other error happened
      // }
    }
  };

  return (
    <Formik
      initialValues={initailState}
      onSubmit={async values => {
        // console.log(values, "-----");

        loginFunc({
          email: values?.email,
          password: values?.password,
        });
        // dispatch(setAuthentication(true));
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
              isLoading={isPending}
              disabled={!isValid || isPending}
            />
            <View style={{alignItems: 'center', marginTop: SD.hp(20)}}>
              <SvgIcon name="Google" size={30} />
            </View>
            <GoogleSigninButton
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              style={{width: '100%', marginTop: SD.hp(20)}}
              onPress={() => {
                // initiate sign in from google
                SignInWithGoogle();
              }}
              // disabled={isInProgress}
            />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: AppTheme.Base,
            }}>
            <Button
              onPress={() => {
                changeLanguage(
                  currentLanguage == LanguageCode.es
                    ? LanguageCode.en
                    : LanguageCode.es,
                );
                console.log('current ', currentLanguage);
              }}
              title={`Switch to ${
                currentLanguage == LanguageCode.es ? 'English' : 'Spanish'
              }`}
              color={AppTheme.Primary}
            />
            <Text style={{color: AppTheme.Primary, marginVertical: 20}}>
              Current Theme: {isDarkTheme ? 'Dark' : 'Light'}
            </Text>

            <Button
              title="Toggle Theme"
              onPress={handleToggle}
              color={AppTheme.Primary}
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
