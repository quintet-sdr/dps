import { useQuery } from '@tanstack/react-query'
import { IUser } from '@/types/types'
import { getOneUser } from '@/lib/api/user'

export function useUser() {
  return useQuery<IUser, Error>({
    queryKey: ['user'],
    queryFn: getOneUser,
    retry: false
  })
}
