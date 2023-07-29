/* eslint-disable react-hooks/exhaustive-deps */
import { mdiBallotOutline } from '@mdi/js'
import { child, get, ref, update } from 'firebase/database'
import { Field, Form, Formik } from 'formik'
import moment from 'moment'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import { db } from '../../../../firebase'
import BaseButton from '../../../components/BaseButton'
import BaseButtons from '../../../components/BaseButtons'
import CardBox from '../../../components/CardBox'
import FormField from '../../../components/FormField'
import SectionMain from '../../../components/SectionMain'
import SectionTitleLineWithButton from '../../../components/SectionTitleLineWithButton'
import { getPageTitle } from '../../../config'
import LayoutAuthenticated from '../../../layouts/Authenticated'

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
interface Product {
  amount: number
  category: string
  description: string
  id: string
  name: string
  price: number
  rating: string
  url: string
  createdAt: string
  updatedAt: string
}

const Update = () => {
  const router = useRouter()
  const { id } = router.query
  const [product, setProduct] = useState<Product>()
  const dbRef = ref(db)
  useEffect(() => {
    get(child(dbRef, `product/${id}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setProduct(snapshot.val())
        } else {
          console.log('No data available')
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])
  console.log('product', product)

  return (
    <LayoutAuthenticated>
      <Head>
        <title>{getPageTitle('Update Product')}</title>
      </Head>
      <SectionMain>
        <>
          <SectionTitleLineWithButton icon={mdiBallotOutline} title="Update Product" main />
          <CardBox>
            {product ? (
              <Formik
                initialValues={product}
                validationSchema={CreateKeyworkSchema}
                onSubmit={(values) => {
                  console.log('values', values)
                  update(ref(db, 'product/' + product.id), {
                    name: values.name,
                    description: values.description,
                    amount: values.amount,
                    price: values.price,
                    url: values.url,
                    category: values.category,
                    createdAt: product.createdAt,
                    updatedAt: moment(new Date()).format('DD MMM YYYY'),
                  })
                    .then(() => {
                      router.push('/product/list')
                      toast.success('Update new product success!')
                    })
                    .catch(() => {
                      toast.error('Update new product fail!')
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
            ) : null}
          </CardBox>
        </>
      </SectionMain>
    </LayoutAuthenticated>
  )
}

export default Update
