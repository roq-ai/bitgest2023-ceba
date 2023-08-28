import * as yup from 'yup';

export const databaseConnectionValidationSchema = yup.object().shape({
  host: yup.string().required(),
  port: yup.number().integer().required(),
  database_name: yup.string().required(),
  username: yup.string().required(),
  password: yup.string().required(),
  company_id: yup.string().nullable().required(),
});
