/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { mdiAccountEditOutline, mdiDelete } from '@mdi/js'
import { onValue, ref, remove } from 'firebase/database'
import moment from 'moment'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { db } from '../../../firebase'
import BaseIcon from '../../components/BaseIcon'
import CardBox from '../../components/CardBox'
import SectionMain from '../../components/SectionMain'
import { getPageTitle } from '../../config'
import LayoutAuthenticated from '../../layouts/Authenticated'

const List = () => {
  const router = useRouter()
  const handleEdit = (id: string) => {
    router.push(`/product/update/${id}`)
  }
  const [data, setData] = useState([])
  const [refetchData, setRefetchData] = useState(0)
  const handleDelete = (id: string) => {
    const productRef = ref(db, 'product/' + id)
    remove(productRef)
      .then(() => {
        setRefetchData((state) => state + 1)
        toast.success('Product has been successfully removed.')
      })
      .catch((error) => {
        toast.error('Error while removing product:', error)
      })
  }
  useEffect(() => {
    const starCountRef = ref(db, 'product')
    onValue(starCountRef, (snapshot) => {
      setData(Object.values(snapshot.val() || {}))
    })
  }, [refetchData])
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
                          Name
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Category
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Amount
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Price
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Rating
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Image
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
                          Updated At
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
                      {data.map((item, index) => {
                        return (
                          <tr key={item.id} className="bg-gray-100 border-b">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {index + 1}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {item.name}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {item.category}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {item.amount}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {item.price}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {item.rating}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              <img alt="" src={item.url} width={'50px'} />
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {moment(item.createdAt).format('MMMM Do YYYY')}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {moment(item.updatedAt).format('MMMM Do YYYY')}
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
      </SectionMain>
    </LayoutAuthenticated>
  )
}

export default List
