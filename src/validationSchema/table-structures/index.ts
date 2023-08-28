import * as yup from 'yup';

export const tableStructureValidationSchema = yup.object().shape({
  table_name: yup.string().required(),
  field_name: yup.string().required(),
  field_type: yup.string().required(),
  is_nullable: yup.boolean().required(),
  default_value: yup.string().nullable(),
  database_connection_id: yup.string().nullable().required(),
});
