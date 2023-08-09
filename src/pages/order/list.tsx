/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { mdiAccountEditOutline } from '@mdi/js'
import { onValue, ref } from 'firebase/database'
import moment from 'moment'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { db } from '../../../firebase'
import BaseIcon from '../../components/BaseIcon'
import CardBox from '../../components/CardBox'
import SectionMain from '../../components/SectionMain'
import { getPageTitle } from '../../config'
import LayoutAuthenticated from '../../layouts/Authenticated'

const List = () => {
  const router = useRouter()
  const handleEdit = (id: string) => {
    router.push(`/order/detail/${id}`)
  }
  const [data, setData] = useState([])
  useEffect(() => {
    const starCountRef = ref(db, 'user')
    onValue(starCountRef, (snapshot) => {
      setData(Object.values(snapshot.val()))
    })
  }, [])
  console.log('data', data)
  return (
    <LayoutAuthenticated>
      <Head>
        <title>{getPageTitle('List Field')}</title>
      </Head>
      <SectionMain>
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
                          Email
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Address
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Total Price
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Created At
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item) => {
                        return (
                          <tr key={item.id} className="bg-gray-100 border-b">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {item.id}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {item.email}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {item.address} - {item.state} - {item.city}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {item.totalPrice}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {moment(item.updatedAt).format('DD-MM-YY')}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {item.status}
                            </td>
                            <td>
                              <button onClick={() => handleEdit(item.id)}>
                                <BaseIcon
                                  path={mdiAccountEditOutline}
                                  className={`flex-none`}
                                  w="w-12"
                                />
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
      </SectionMain>
    </LayoutAuthenticated>
  )
}

export default List
