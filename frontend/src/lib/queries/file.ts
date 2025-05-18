import { useQuery } from '@tanstack/react-query'
import { getFiles, getUsersFile } from '@/lib/api/file'
import { File } from '@/types/types'

export function useDownloadedFiles() {
  return useQuery<File[], Error>({
    queryKey: ['files'],
    queryFn: getFiles,
    retry: true
  })
}

export function useUsersFiles(userId: number) {
  return useQuery<File[], Error>({
    queryKey: ['usersFiles', userId],
    queryFn: ({ queryKey }) => getUsersFile(queryKey[1] as number),
    enabled: !!userId,
    retry: true
  })
}
