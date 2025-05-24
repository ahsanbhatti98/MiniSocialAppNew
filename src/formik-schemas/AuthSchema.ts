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
  full_name: Yup.string()
    .required('Full name is required')
    .min(2, 'Full name is too short'),
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
});

export default {
  LoginSchema,
  SignUpSchema,
};
