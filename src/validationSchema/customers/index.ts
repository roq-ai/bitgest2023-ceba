import * as yup from 'yup';

export const customerValidationSchema = yup.object().shape({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  address: yup.string().required(),
  city: yup.string().required(),
  country: yup.string().required(),
  phone: yup.string().required(),
  company_id: yup.string().nullable().required(),
});
