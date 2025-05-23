import * as Yup from 'yup';
import {CommonUtils} from '../utils';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .matches(CommonUtils.emailRegex, 'Invalid email')
    .required('Please enter your email address.'),
  password: Yup.string().required('Please enter your password.'),
  // date: Yup.date().required("Please select your date of birth."),
});

const SignUpSchema = Yup.object().shape({
  first_name: Yup.string()
    .required('First name is required')
    .min(2, 'First name is too short'),
  last_name: Yup.string()
    .required('Last name is required')
    .min(2, 'Last name is too short'),
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Password must contain at least one special character',
    )
    .matches(/\d/, 'Password must contain at least one number'),
  phone: Yup.string()
    .required('Phone number is required')
    .matches(
      /^\+[1-9]\d{8,14}$/,
      'Enter a valid phone number starting with + and at least 9 digits',
    ),
  address_one: Yup.string()
    .required('Address Line 1 is required')
    .min(5, 'Address Line 1 is too short'),
  address_two: Yup.string(), // Optional
  state: Yup.string().required('State is required'),
  country: Yup.string().required('Country is required'),
  accept_terms: Yup.boolean().oneOf(
    [true],
    'You must accept the terms and conditions',
  ),
});

export default {
  LoginSchema,
  SignUpSchema,
};
