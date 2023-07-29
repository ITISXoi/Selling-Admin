import { mdiAccount, mdiBallotOutline } from '@mdi/js'
import { Field, Form, Formik } from 'formik'
import Head from 'next/head'
import * as Yup from 'yup'
import BaseButton from '../../components/BaseButton'
import BaseButtons from '../../components/BaseButtons'
import CardBox from '../../components/CardBox'
import FormField from '../../components/FormField'
import SectionMain from '../../components/SectionMain'
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton'
import { getPageTitle } from '../../config'
import LayoutAuthenticated from '../../layouts/Authenticated'
import { push, ref, set } from 'firebase/database'
import { db } from '../../../firebase'
import moment from 'moment'
import router from 'next/router'
import { toast } from 'react-toastify'

const CreateTemplateSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
})

const CreateTemplate = () => {
  return (
    <LayoutAuthenticated>
      <Head>
        <title>{getPageTitle('Create Category')}</title>
      </Head>
      <SectionMain>
        <>
          <SectionTitleLineWithButton icon={mdiBallotOutline} title="Create Category" main />
          <CardBox>
            <Formik
              initialValues={{
                name: '',
              }}
              validationSchema={CreateTemplateSchema}
              onSubmit={(values) => {
                console.log('values', values)
                const productKey = push(ref(db, 'category')).key
                set(ref(db, 'category/' + productKey), {
                  id: productKey,
                  name: values.name,
                  createdAt: moment(new Date()).format('DD MMM YYYY'),
                  updatedAt: '',
                })
                  .then(() => {
                    router.push('/category/list')
                    toast.success('Create new product success!')
                  })
                  .catch(() => {
                    toast.error('Create new product fail!')
                  })
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <FormField label="Name" icons={[mdiAccount]}>
                    <Field name="name" placeholder="Name" />
                  </FormField>
                  {errors.name && touched.name ? (
                    <p className="text-sm text-red-500 mb-[20px]">{errors.name}</p>
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
      </SectionMain>
    </LayoutAuthenticated>
  )
}

export default CreateTemplate
