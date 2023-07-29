import { mdiBallotOutline } from '@mdi/js'
import { push, ref, set } from 'firebase/database'
import { Field, Form, Formik } from 'formik'
import Head from 'next/head'
import router from 'next/router'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import { db } from '../../../firebase'
import BaseButton from '../../components/BaseButton'
import BaseButtons from '../../components/BaseButtons'
import CardBox from '../../components/CardBox'
import FormField from '../../components/FormField'
import SectionMain from '../../components/SectionMain'
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton'
import { getPageTitle } from '../../config'
import LayoutAuthenticated from '../../layouts/Authenticated'
import moment from 'moment'

const CreateKeyworkSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  category: Yup.string().required('Required'),
  amount: Yup.string().required('Required'),
  price: Yup.string().required('Required'),
  url: Yup.string().required('Required'),
})

const listCategory = [
  { id: 0, name: 'Please select', value: '' },
  { id: 1, name: 'Coffee', value: 'Coffee' },
  { id: 2, name: 'Cake', value: 'Cake' },
]

const CreateFieldContainer = () => {
  console.log('date', moment(new Date()).format('DD MMM YYYY'))
  return (
    <LayoutAuthenticated>
      <Head>
        <title>{getPageTitle('Create Product')}</title>
      </Head>
      <SectionMain>
        <>
          <SectionTitleLineWithButton icon={mdiBallotOutline} title="Create Product" main />
          <CardBox>
            <Formik
              initialValues={{
                name: '',
                category: '',
                description: '',
                amount: '',
                price: '',
                url: '',
              }}
              validationSchema={CreateKeyworkSchema}
              onSubmit={(values) => {
                console.log('values', values)
                const productKey = push(ref(db, 'product')).key
                set(ref(db, 'product/' + productKey), {
                  id: productKey,
                  name: values.name,
                  description: values.description,
                  amount: values.amount,
                  price: values.price,
                  url: values.url,
                  category: values.category,
                  rating: '',
                  createdAt: moment(new Date()).format('DD MMM YYYY'),
                  updatedAt: '',
                })
                  .then(() => {
                    router.push('/product/list')
                    toast.success('Create new product success!')
                  })
                  .catch(() => {
                    toast.error('Create new product fail!')
                  })
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <FormField label="Name">
                    <Field name="name" placeholder="Name" />
                  </FormField>
                  {errors.name && touched.name ? (
                    <p className="text-sm text-red-500 mb-[20px]">{errors.name}</p>
                  ) : null}
                  <FormField label="Category">
                    <Field as="select" name="category">
                      {listCategory.map((item) => (
                        <option value={item.value} key={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </Field>
                  </FormField>
                  {errors.category && touched.category ? (
                    <p className="text-sm text-red-500 mb-[20px]">{errors.category}</p>
                  ) : null}
                  <FormField label="Description">
                    <Field name="description" placeholder="Description" />
                  </FormField>
                  {errors.description && touched.description ? (
                    <p className="text-sm text-red-500 mb-[20px]">{errors.description}</p>
                  ) : null}
                  <FormField label="Amount">
                    <Field type="number" name="amount" placeholder="Amount" />
                  </FormField>
                  {errors.amount && touched.amount ? (
                    <p className="text-sm text-red-500 mb-[20px]">{errors.amount}</p>
                  ) : null}
                  <FormField label="Price">
                    <Field type="number" name="price" placeholder="Price" />
                  </FormField>
                  {errors.price && touched.price ? (
                    <p className="text-sm text-red-500 mb-[20px]">{errors.price}</p>
                  ) : null}
                  <FormField label="Image">
                    <Field name="url" placeholder="Image link" />
                  </FormField>
                  {errors.url && touched.url ? (
                    <p className="text-sm text-red-500 mb-[20px]">{errors.url}</p>
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

export default CreateFieldContainer
