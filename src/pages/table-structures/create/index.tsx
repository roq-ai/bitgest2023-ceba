import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createTableStructure } from 'apiSdk/table-structures';
import { tableStructureValidationSchema } from 'validationSchema/table-structures';
import { DatabaseConnectionInterface } from 'interfaces/database-connection';
import { getDatabaseConnections } from 'apiSdk/database-connections';
import { TableStructureInterface } from 'interfaces/table-structure';

function TableStructureCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: TableStructureInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createTableStructure(values);
      resetForm();
      router.push('/table-structures');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<TableStructureInterface>({
    initialValues: {
      table_name: '',
      field_name: '',
      field_type: '',
      is_nullable: false,
      default_value: '',
      database_connection_id: (router.query.database_connection_id as string) ?? null,
    },
    validationSchema: tableStructureValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Table Structures',
              link: '/table-structures',
            },
            {
              label: 'Create Table Structure',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Table Structure
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.table_name}
            label={'Table Name'}
            props={{
              name: 'table_name',
              placeholder: 'Table Name',
              value: formik.values?.table_name,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.field_name}
            label={'Field Name'}
            props={{
              name: 'field_name',
              placeholder: 'Field Name',
              value: formik.values?.field_name,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.field_type}
            label={'Field Type'}
            props={{
              name: 'field_type',
              placeholder: 'Field Type',
              value: formik.values?.field_type,
              onChange: formik.handleChange,
            }}
          />

          <FormControl
            id="is_nullable"
            display="flex"
            alignItems="center"
            mb="4"
            isInvalid={!!formik.errors?.is_nullable}
          >
            <FormLabel htmlFor="switch-is_nullable">Is Nullable</FormLabel>
            <Switch
              id="switch-is_nullable"
              name="is_nullable"
              onChange={formik.handleChange}
              value={formik.values?.is_nullable ? 1 : 0}
            />
            {formik.errors?.is_nullable && <FormErrorMessage>{formik.errors?.is_nullable}</FormErrorMessage>}
          </FormControl>

          <TextInput
            error={formik.errors.default_value}
            label={'Default Value'}
            props={{
              name: 'default_value',
              placeholder: 'Default Value',
              value: formik.values?.default_value,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<DatabaseConnectionInterface>
            formik={formik}
            name={'database_connection_id'}
            label={'Select Database Connection'}
            placeholder={'Select Database Connection'}
            fetcher={getDatabaseConnections}
            labelField={'host'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/table-structures')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'table_structure',
    operation: AccessOperationEnum.CREATE,
  }),
)(TableStructureCreatePage);
