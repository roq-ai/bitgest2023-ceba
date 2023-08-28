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

import { createForm } from 'apiSdk/forms';
import { formValidationSchema } from 'validationSchema/forms';
import { TableStructureInterface } from 'interfaces/table-structure';
import { CompanyInterface } from 'interfaces/company';
import { getTableStructures } from 'apiSdk/table-structures';
import { getCompanies } from 'apiSdk/companies';
import { FormInterface } from 'interfaces/form';

function FormCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: FormInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createForm(values);
      resetForm();
      router.push('/forms');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<FormInterface>({
    initialValues: {
      form_type: '',
      table_structure_id: (router.query.table_structure_id as string) ?? null,
      company_id: (router.query.company_id as string) ?? null,
    },
    validationSchema: formValidationSchema,
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
              label: 'Forms',
              link: '/forms',
            },
            {
              label: 'Create Form',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Form
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.form_type}
            label={'Form Type'}
            props={{
              name: 'form_type',
              placeholder: 'Form Type',
              value: formik.values?.form_type,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<TableStructureInterface>
            formik={formik}
            name={'table_structure_id'}
            label={'Select Table Structure'}
            placeholder={'Select Table Structure'}
            fetcher={getTableStructures}
            labelField={'table_name'}
          />
          <AsyncSelect<CompanyInterface>
            formik={formik}
            name={'company_id'}
            label={'Select Company'}
            placeholder={'Select Company'}
            fetcher={getCompanies}
            labelField={'name'}
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
              onClick={() => router.push('/forms')}
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
    entity: 'form',
    operation: AccessOperationEnum.CREATE,
  }),
)(FormCreatePage);
