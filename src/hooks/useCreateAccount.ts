import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { createAdmin, createSuperAdmin, createUser } from '../services/auth/request'
import { handleErrorMutate } from '../utils'

export const useCreateAccount = () => {
  // const router = useRouter()

  const { mutate: createUserFunc, isLoading: loadingCreateUser } = useMutation(createUser, {
    onSuccess: async () => {
      // router.push('/location/list')
      toast.success('Successful')
    },
    onError: handleErrorMutate,
  })
  const { mutate: createAdminFunc, isLoading: loadingCreateAdmin } = useMutation(createAdmin, {
    onSuccess: async () => {
      // router.push('/location/list')
      toast.success('Successful')
    },
    onError: handleErrorMutate,
  })
  const { mutate: createSuperAdminFunc, isLoading: loadingCreateSuperAdmin } = useMutation(
    createSuperAdmin,
    {
      onSuccess: async () => {
        // router.push('/location/list')
        toast.success('Successful')
      },
      onError: handleErrorMutate,
    }
  )
  return {
    createUserFunc,
    loadingCreateUser,
    createAdminFunc,
    loadingCreateAdmin,
    createSuperAdminFunc,
    loadingCreateSuperAdmin,
  }
}
