import {Formik} from 'formik';
import React, {useRef, useState} from 'react';
import {TextInput, View} from 'react-native';
import {
  Checkbox,
  CustomInput,
  CustomTouchable,
  MainContainer,
  PrimaryButton,
  Text,
} from '../../../components';
import {NavigationService} from '../../../config';
import {AuthRoutes} from '../../../constants';
import {SD} from '../../../utils';
// import {SignUpSchema} from '../../../formik-schemas'; // Add your Yup schema
import {ScrollView} from 'react-native-gesture-handler';
import {AuthSchema} from '../../../formik-schemas';
import {useSignUp} from '../../../hooks/api'; // Hook for signup API

export const SignUp = () => {
  // const dispatch = useDispatch();
  const [hidePassword, setHidePassword] = useState(true);
  const [isCheckedTerms, setIsCheckedTerms] = useState(false);

  const lastNameRef = useRef<TextInput>(null!);
  const emailRef = useRef<TextInput>(null!);
  const passwordRef = useRef<TextInput>(null!);
  const phoneRef = useRef<TextInput>(null!);
  const addressOneRef = useRef<TextInput>(null!);
  const addressTwoRef = useRef<TextInput>(null!);
  const stateRef = useRef<TextInput>(null!);
  const countryRef = useRef<TextInput>(null!);

  const {mutate: signUpFunc, isPending} = useSignUp();

  const initialValues = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    phone: '',
    address_one: '',
    address_two: '',
    state: '',
    country: '',
    accept_terms: isCheckedTerms,
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={values => {
        // const body = {
        //   accept_terms: isCheckedTerms,
        //   email: values.email,
        //   email_verified: false,
        //   password: values.password,
        //   first_name: values.first_name,
        //   last_name: values.last_name,
        //   address_one: values.address_one,
        //   address_two: values.address_two,
        //   state: values.state,
        //   country: values.country,
        //   phone: values.phone,
        // };
        signUpFunc(values);
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
        setFieldValue,
      }) => (
        <MainContainer isFlatList>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{flex: 1}}>
              <CustomInput
                placeholder="First Name"
                value={values.first_name}
                onChangeText={handleChange('first_name')}
                onBlur={() => setFieldTouched('first_name')}
                error={errors?.first_name}
                touched={touched?.first_name}
                returnKeyType="next"
                onSubmitEditing={() => lastNameRef.current.focus()}
              />
              <CustomInput
                placeholder="Last Name"
                inputRef={lastNameRef}
                value={values.last_name}
                onChangeText={handleChange('last_name')}
                onBlur={() => setFieldTouched('last_name')}
                error={errors?.last_name}
                touched={touched?.last_name}
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
                returnKeyType="next"
                onSubmitEditing={() => phoneRef.current.focus()}
              />
              <CustomInput
                placeholder="Phone"
                inputRef={phoneRef}
                value={values.phone}
                onChangeText={handleChange('phone')}
                onBlur={() => setFieldTouched('phone')}
                error={errors?.phone}
                touched={touched?.phone}
                keyboardType="phone-pad"
                returnKeyType="next"
                onSubmitEditing={() => addressOneRef.current.focus()}
              />
              <CustomInput
                placeholder="Address Line 1"
                inputRef={addressOneRef}
                value={values.address_one}
                onChangeText={handleChange('address_one')}
                onBlur={() => setFieldTouched('address_one')}
                error={errors?.address_one}
                touched={touched?.address_one}
                returnKeyType="next"
                onSubmitEditing={() => addressTwoRef.current.focus()}
              />
              <CustomInput
                placeholder="Address Line 2"
                inputRef={addressTwoRef}
                value={values.address_two}
                onChangeText={handleChange('address_two')}
                onBlur={() => setFieldTouched('address_two')}
                error={errors?.address_two}
                touched={touched?.address_two}
                returnKeyType="next"
                onSubmitEditing={() => stateRef.current.focus()}
              />
              <CustomInput
                placeholder="State"
                inputRef={stateRef}
                value={values.state}
                onChangeText={handleChange('state')}
                onBlur={() => setFieldTouched('state')}
                error={errors?.state}
                touched={touched?.state}
                returnKeyType="next"
                onSubmitEditing={() => countryRef.current.focus()}
              />
              <CustomInput
                placeholder="Country"
                inputRef={countryRef}
                value={values.country}
                onChangeText={handleChange('country')}
                onBlur={() => setFieldTouched('country')}
                error={errors?.country}
                touched={touched?.country}
                returnKeyType="done"
              />
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Checkbox
                  checked={isCheckedTerms}
                  onPress={() => {
                    setIsCheckedTerms(prev => !prev);
                    setFieldValue('accept_terms', !isCheckedTerms);
                  }}
                />
                <Text
                  regular
                  size={12}
                  color="grey"
                  style={{flex: 1, marginRight: SD.hp(10)}}>
                  By signing up, you agree to our{' '}
                  <Text
                    bold
                    size={12}
                    color="primary"
                    onPress={() => {
                      // Handle terms and conditions navigation
                    }}>
                    Terms and Conditions
                  </Text>{' '}
                  and{' '}
                  <Text
                    bold
                    size={12}
                    color="primary"
                    onPress={() => {
                      // Handle privacy policy navigation
                    }}>
                    Privacy Policy
                  </Text>
                </Text>
              </View>
              <PrimaryButton
                title="Sign Up"
                onPress={() => handleSubmit()}
                customStyles={{marginTop: SD.hp(20)}}
                isLoading={isPending}
                disabled={!isValid || isPending}
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
