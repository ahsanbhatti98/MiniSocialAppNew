import {Formik} from 'formik';
import React, {useRef, useState} from 'react';
import {TextInput, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {
  CustomInput,
  CustomTouchable,
  MainContainer,
  PrimaryButton,
  Text,
} from '../../../components';
import {NavigationService} from '../../../config';
import {AuthRoutes} from '../../../constants';
import {AuthSchema} from '../../../formik-schemas';
import {SD} from '../../../utils';
import {useFirebaseAuth} from '@src/hooks';

export const SignUp = () => {
  // const dispatch = useDispatch();
  const {signupFirebase, loading} = useFirebaseAuth();
  const [hidePassword, setHidePassword] = useState(true);
  const fullNameRef = useRef<TextInput>(null!);
  const emailRef = useRef<TextInput>(null!);
  const passwordRef = useRef<TextInput>(null!);

  const initialValues = {
    full_name: '',
    email: '',
    password: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={values => {
        console.log('Form values:', values);
        const body = {
          email: values.email,
          password: values.password,
        };

        signupFirebase(body.email, body.password, values.full_name);
      }}
      validationSchema={AuthSchema.SignUpSchema}>
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        isValid,
        setFieldTouched,
      }) => (
        <MainContainer isFlatList>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{flex: 1}}>
              <CustomInput
                placeholder="Full Name"
                inputRef={fullNameRef}
                value={values.full_name}
                onChangeText={handleChange('full_name')}
                onBlur={() => setFieldTouched('full_name')}
                error={errors?.full_name}
                touched={touched?.full_name}
                returnKeyType="next"
                onSubmitEditing={() => emailRef.current.focus()}
              />
              <CustomInput
                placeholder="Email Address"
                inputRef={emailRef}
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={() => setFieldTouched('email')}
                error={errors?.email}
                touched={touched?.email}
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current.focus()}
              />
              <CustomInput
                placeholder="Password"
                inputRef={passwordRef}
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={() => setFieldTouched('password')}
                error={errors?.password}
                touched={touched?.password}
                secureTextEntry={hidePassword}
                eye
                hidepswdState={hidePassword}
                onEyePress={() => {
                  if (values.password) setHidePassword(prev => !prev);
                }}
                returnKeyType="done"
              />

              <PrimaryButton
                title="Sign Up"
                onPress={() => handleSubmit()}
                customStyles={{marginTop: SD.hp(20)}}
                isLoading={loading}
                disabled={loading}
              />
            </View>

            <CustomTouchable
              style={{marginBottom: SD.hp(20)}}
              onPress={() => {
                NavigationService.navigate('Auth', {
                  screen: AuthRoutes.Login,
                });
              }}>
              <Text bold centered primartColor>
                Already have an account? Login
              </Text>
            </CustomTouchable>
          </ScrollView>
        </MainContainer>
      )}
    </Formik>
  );
};
