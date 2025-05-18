import { useQuery } from '@tanstack/react-query'
import { getFiles } from '@/lib/api/file'
import { File } from '@/types/types'

export function useFiles() {
  return useQuery<File[], Error>({
    queryKey: ['files'],
    queryFn: getFiles,
    retry: true
  })
}
