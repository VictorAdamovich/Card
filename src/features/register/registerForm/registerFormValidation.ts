import * as yup from 'yup';

const minPasswordLength = 7;

export const validationsSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Required'),
  password: yup.string().min(minPasswordLength, 'Too Short!').required('Required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Required'),
});
