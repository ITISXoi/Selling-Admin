import React from 'react'
import LayoutAuthenticated from '../../../layouts/Authenticated'
import Head from 'next/head'
import { getPageTitle } from '../../../config'
import SectionMain from '../../../components/SectionMain'
import SectionTitleLineWithButton from '../../../components/SectionTitleLineWithButton'
import { mdiAccount, mdiBallotOutline } from '@mdi/js'
import CardBox from '../../../components/CardBox'
import { Field, Form, Formik } from 'formik'
import FormField from '../../../components/FormField'
import BaseButtons from '../../../components/BaseButtons'
import BaseButton from '../../../components/BaseButton'
import * as Yup from 'yup'
import Loading from '../../../components/Loading'
import { useRouter } from 'next/router'
import { useTemplate } from '../../../hooks/useTemplate'

const CreateTemplateSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  link: Yup.string()
    .min(2, 'Too Short!')
    // .matches(
    //   /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
    //   'Enter correct url!'
    // )
    .required('Required'),
})

const Update = () => {
  const router = useRouter()

  const { id } = router.query
  const { updateTemplateFunc, loadingUpdate, template } = useTemplate(Number(id))
  console.log("template: ", template)
  const nameTemplate = template.name
  const linkTemplate = template.link 
  console.log("nameTemplate: ", nameTemplate)

  return (
    <LayoutAuthenticated>
      <Head>
        <title>{getPageTitle('Update Keyword')}</title>
      </Head>
      <SectionMain>
        {loadingUpdate ? (
          <Loading />
        ) : (
          <>
            <SectionTitleLineWithButton icon={mdiBallotOutline} title="Update Keyword" main />
            <CardBox>
              {nameTemplate && (
                <Formik
                  initialValues={{
                    name: nameTemplate,
                    link: linkTemplate,
                  }}
                  validationSchema={CreateTemplateSchema}
                  onSubmit={(values) => {
                    updateTemplateFunc({ name: values.name, id: Number(id), link: values.link })
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
                      <FormField label="Link" icons={[mdiAccount]}>
                        <Field name="link" placeholder="Link" />
                      </FormField>
                      {errors.link && touched.link ? (
                        <p className="text-sm text-red-500 mb-[20px]">{String(errors.link)}</p>
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
        )}
      </SectionMain>
    </LayoutAuthenticated>
  )
}

export default Update
