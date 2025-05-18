'use client'
import { FileTable } from '@/components/file-table'
import { columns } from '@/app/files/columns'
import FileUploader from '@/components/file-uploader'
import HeaderAuth from '@/components/header-auth'
import { useUser } from '@/lib/queries/user'
import { useDownloadedFiles } from '@/lib/queries/file'

export default function Home() {
  const { data: filesDownload, isLoading: isFilesLoading, error: filesError } = useDownloadedFiles()
  const { data: user, isLoading: isUserLoading, error: userError } = useUser()

  if (isFilesLoading || isUserLoading) return <div>Загрузка...</div>
  if (filesError) return <div>Ошибка загрузки файлов: {filesError.message}</div>
  if (userError) return <div>Ошибка загрузки пользователя: {userError.message}</div>
  if (!user) return <div>Нет данных о пользователе</div>

  return (
    <>
      <HeaderAuth user={user} />
      <main className="flex h-screen w-screen flex-col items-center justify-center space-y-8">
        <section className="flex w-[80%] flex-row items-center justify-around gap-8">
          <div className="flex flex-col items-center space-y-2">
            <h3 className="text-background text-3xl font-semibold">Files to download</h3>
            <FileTable columns={columns} data={filesDownload ?? []} />
          </div>
          <div className="flex flex-col items-center space-y-2">
            <h3 className="text-background text-3xl font-semibold">Your uploaded files</h3>
            <FileTable columns={columns} data={filesDownload ?? []} />
          </div>
        </section>
        <FileUploader />
      </main>
    </>
  )
}
