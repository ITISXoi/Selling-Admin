/* eslint-disable react-hooks/exhaustive-deps */
import { mdiAccount, mdiBallotOutline } from '@mdi/js'
import { child, get, ref, update } from 'firebase/database'
import { Field, Form, Formik } from 'formik'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
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
import moment from 'moment'
import { toast } from 'react-toastify'

interface Caterogry {
  id: string
  name: string
  createdAt: string
  updatedAt: string
}

const CreateTemplateSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
})

const Update = () => {
  const router = useRouter()
  const { id } = router.query
  const [category, setCategory] = useState<Caterogry>()
  const dbRef = ref(db)
  useEffect(() => {
    get(child(dbRef, `category/${id}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setCategory(snapshot.val())
        } else {
          console.log('No data available')
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])
  return (
    <LayoutAuthenticated>
      <Head>
        <title>{getPageTitle('Update Category')}</title>
      </Head>
      <SectionMain>
        <>
          <SectionTitleLineWithButton icon={mdiBallotOutline} title="Update Category" main />
          <CardBox>
            {category && (
              <Formik
                initialValues={{
                  name: category.name,
                }}
                validationSchema={CreateTemplateSchema}
                onSubmit={(values) => {
                  console.log('values', values)
                  update(ref(db, 'category/' + category.id), {
                    name: values.name,
                    createdAt: category.createdAt,
                    updatedAt: moment(new Date()).format('DD MMM YYYY'),
                  })
                    .then(() => {
                      router.push('/category/list')
                      toast.success('Update new category success!')
                    })
                    .catch(() => {
                      toast.error('Update new category fail!')
                    })
                }}
              >
                {({ errors, touched }) => (
                  <Form>
                    <FormField label="Name" icons={[mdiAccount]}>
                      <Field name="name" placeholder="Name" />
                    </FormField>
                    {errors.name && touched.name ? (
                      <p className="text-sm text-red-500 mb-[20px]">{String(errors.name)}</p>
                    ) : null}
                    <BaseButtons>
                      <BaseButton type="submit" color="info" label="Submit" />
                      <BaseButton type="reset" color="info" outline label="Reset" />
                    </BaseButtons>
                  </Form>
                )}
              </Formik>
            )}
          </CardBox>
        </>
      </SectionMain>
    </LayoutAuthenticated>
  )
}

export default Update
