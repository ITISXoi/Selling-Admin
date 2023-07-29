import Head from 'next/head'
import React from 'react'
import CardBox from '../../components/CardBox'
import SectionMain from '../../components/SectionMain'
import { getPageTitle } from '../../config'
import LayoutAuthenticated from '../../layouts/Authenticated'
import moment from 'moment'
import { mdiAccountEditOutline, mdiBallotOutline } from '@mdi/js'
import { mdiDelete } from '@mdi/js'
import BaseIcon from '../../components/BaseIcon'
import { useRouter } from 'next/router'
import Loading from '../../components/Loading'
import { useTemplate } from '../../hooks/useTemplate'
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton'
const List = () => {
  const { listTemplate, deleteTemplateFunc, loadingDelete } = useTemplate()
  const router = useRouter()
  const handleEdit = (id: string) => {
    router.push(`/template-crawler/update/${id}`)
  }
  console.log('listTemplate: ', listTemplate)
  const handleDelete = (id: string) => {
    deleteTemplateFunc({ id: Number(id) })
  }

  return (
    <LayoutAuthenticated>
      <Head>
        <title>{getPageTitle('List Category')}</title>
      </Head>
      <SectionMain>
        {loadingDelete ? (
          <Loading />
        ) : (
          <>
            <SectionTitleLineWithButton icon={mdiBallotOutline} title="List Category" main />
            <CardBox className="mb-6" hasTable>
              <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                      <table className="min-w-full">
                        <thead className="bg-white border-b">
                          <tr>
                            <th
                              scope="col"
                              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                            >
                              #
                            </th>
                            <th
                              scope="col"
                              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                            >
                              Name
                            </th>
                            <th
                              scope="col"
                              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                            >
                              Create At
                            </th>
                            <th
                              scope="col"
                              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                            >
                              Update At
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {listTemplate.map((item, index) => {
                            return (
                              <tr key={item.id} className="bg-gray-100 border-b">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {index + 1}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                  {item.name}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                  {moment(Number(item.createdAt)).format('MMMM Do YYYY')}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                  {moment(Number(item.updatedAt)).format('MMMM Do YYYY')}
                                </td>
                                <td>
                                  <button onClick={() => handleEdit(item.id)}>
                                    <BaseIcon
                                      path={mdiAccountEditOutline}
                                      className={`flex-none`}
                                      w="w-12"
                                    />
                                  </button>
                                  <button onClick={() => handleDelete(item.id)}>
                                    <BaseIcon path={mdiDelete} className={`flex-none`} w="w-12" />
                                  </button>
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </CardBox>
          </>
        )}
      </SectionMain>
    </LayoutAuthenticated>
  )
}

export default List
