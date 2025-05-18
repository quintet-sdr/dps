import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getFiles, getUsersFile, uploadFile } from '@/lib/api/file'
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

export function useUploadFile() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (file: globalThis.File) => uploadFile(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['files'] })
      queryClient.invalidateQueries({ queryKey: ['usersFiles'] })
    }
  })
}
