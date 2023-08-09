/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { mdiBallotOutline } from '@mdi/js'
import { Stack, Typography } from '@mui/material'
import { child, get, ref, update } from 'firebase/database'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { db } from '../../../../firebase'
import CardBox from '../../../components/CardBox'
import SectionMain from '../../../components/SectionMain'
import SectionTitleLineWithButton from '../../../components/SectionTitleLineWithButton'
import { getPageTitle } from '../../../config'
import LayoutAuthenticated from '../../../layouts/Authenticated'
import BaseButton from '../../../components/BaseButton'
import moment from 'moment'
import { toast } from 'react-toastify'

const Update = () => {
  const router = useRouter()
  const { id } = router.query
  const [order, setOrder] = useState<any>()
  const [refetch, setRefetch] = useState(0)
  const dbRef = ref(db)
  useEffect(() => {
    get(child(dbRef, `user/${id}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setOrder(snapshot.val())
        } else {
          console.log('No data available')
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }, [refetch, id])
  const handleApprove = (status: string) => {
    update(ref(db, 'user/' + order.id), {
      email: order.email,
      address: order.address,
      state: order.state,
      city: order.city,
      id: order.id,
      status: status,
      cart: order.cart,
      totalPrice: order.totalPrice,
      createdAt: order.createdAt,
      updatedAt: moment(new Date()).format('DD-MM-YYYY HH:mm:ss'),
      phoneNumber: order.phoneNumber,
    })
      .then(() => {
        setRefetch(refetch + 1)
        toast.success('Order success!')
      })
      .catch(() => {
        toast.error('Order fail!')
      })
  }

  return (
    <LayoutAuthenticated>
      <Head>
        <title>{getPageTitle('Detail Order')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiBallotOutline} title="Detail Order" main />
        {order ? (
          <Stack gap={2} mb={'20px'}>
            <Typography>Email: {order?.email}</Typography>
            <Typography>
              Address: {order?.address} - {order?.state} - {order?.city}
            </Typography>
            <Typography>Phone Number: {order?.phoneNumber}</Typography>
            <Typography>Total Price: {order?.totalPrice} VNĐ</Typography>
            <Typography>Status: {order?.status}</Typography>
            {order.status === 'PENDING' ? (
              <Stack flexDirection={'row'} gap={2}>
                <BaseButton
                  type="submit"
                  color="info"
                  label="Approve"
                  onClick={() => handleApprove('PACKING')}
                />
              </Stack>
            ) : order.status === 'PACKING' ? (
              <Stack flexDirection={'row'} gap={2}>
                <BaseButton
                  type="submit"
                  color="info"
                  label="Packing Done"
                  onClick={() => handleApprove('SHIPPING')}
                />
              </Stack>
            ) : null}
          </Stack>
        ) : null}
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
                          Image
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Name Product
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
                          Quantity
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {order?.cart.map((item) => {
                        return (
                          <tr key={item.id} className="bg-gray-100 border-b">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {item.id}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              <img alt="" src={item.url} width={'50px'} />
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {item.name}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {item.price}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {item.quantity}
                            </td>
                            <td></td>
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

export default Update
