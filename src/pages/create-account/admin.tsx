import { mdiAccount, mdiBallotOutline } from '@mdi/js'
import { Field, Form, Formik } from 'formik'
import Head from 'next/head'
import * as Yup from 'yup'
import BaseButton from '../../components/BaseButton'
import BaseButtons from '../../components/BaseButtons'
import CardBox from '../../components/CardBox'
import FormField from '../../components/FormField'
import Loading from '../../components/Loading'
import SectionMain from '../../components/SectionMain'
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton'
import { getPageTitle } from '../../config'
import { useCreateAccount } from '../../hooks/useCreateAccount'
import LayoutAuthenticated from '../../layouts/Authenticated'

const CreateSuperAdminSchema = Yup.object().shape({
  email: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .email('Must be Email')
    .required('Required'),
})

const CreateSuperAdmin = () => {
  const { createSuperAdminFunc, loadingCreateSuperAdmin } = useCreateAccount()
  return (
    <LayoutAuthenticated>
      <Head>
        <title>{getPageTitle('Create Admin')}</title>
      </Head>
      <SectionMain>
        {loadingCreateSuperAdmin ? (
          <Loading />
        ) : (
          <>
            <SectionTitleLineWithButton icon={mdiBallotOutline} title="Create Admin" main />
            <CardBox>
              <Formik
                initialValues={{
                  email: '',
                }}
                validationSchema={CreateSuperAdminSchema}
                onSubmit={(values) => {
                  createSuperAdminFunc({ email: values.email })
                }}
              >
                {({ errors, touched }) => (
                  <Form>
                    <FormField label="Email" icons={[mdiAccount]}>
                      <Field name="email" placeholder="Email" />
                    </FormField>
                    {errors.email && touched.email ? (
                      <p className="text-sm text-red-500 mb-[20px]">{errors.email}</p>
                    ) : null}
                    <BaseButtons>
                      <BaseButton type="submit" color="info" label="Submit" />
                      <BaseButton type="reset" color="info" outline label="Reset" />
                    </BaseButtons>
                  </Form>
                )}
              </Formik>
            </CardBox>
          </>
        )}
      </SectionMain>
    </LayoutAuthenticated>
  )
}

export default CreateSuperAdmin;