import * as yup from 'yup';

export const formValidationSchema = yup.object().shape({
  form_type: yup.string().required(),
  table_structure_id: yup.string().nullable().required(),
  company_id: yup.string().nullable().required(),
});
